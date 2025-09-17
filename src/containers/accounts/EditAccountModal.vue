<template>
	<VDialog v-model="accountsStore.editAccountModal" max-width="500">
		<VCard :title="$t('accounts.modals.editAccount.title')">
			<template #text>
				<VRow>
					<VCol cols="12">
						<VTextField
							v-model="formData.name"
							:label="$t('accounts.modals.name')"
							:disabled="isEditingAccount"
						/>
					</VCol>
					<VCol cols="12" md="6">
						<VSelect
							v-model="formData.type"
							:label="$t('accounts.modals.type')"
							:items="accountTypes"
							item-title="title"
							item-value="value"
							:loading="isAccountTypesLoading"
							:disabled="isEditingAccount || hasTransactions"
						/>
					</VCol>
					<VCol cols="12" md="6">
						<VAutocomplete
							v-model="formData.currency"
							:label="$t('accounts.modals.currency')"
							:items="currencyList"
							:loading="isCurrenciesLoading"
							:disabled="isEditingAccount || hasTransactions"
						/>
					</VCol>
					<VCol cols="12">
						<VNumberInput
							v-model="formData.initialBalance"
							:min="0"
							:precision="precision"
							:label="$t('accounts.modals.initialBalance')"
							:disabled="isEditingAccount || hasTransactions"
						/>
					</VCol>
				</VRow>
				<VTextarea
					v-model="formData.note"
					:label="$t('accounts.modals.note')"
					:disabled="isEditingAccount"
				/>
			</template>
			<VDivider />
			<VCardActions class="bg-surface-light">
				<VBtn
					:text="$t('accounts.modals.cancelBtn')"
					variant="plain"
					:disabled="isEditingAccount"
					@click="accountsStore.editAccountModal = false"
				/>
				<VSpacer />
				<VBtn
					:text="$t('accounts.modals.editAccount.editBtn')"
					:loading="isEditingAccount"
					:disabled="isEditingAccount"
					@click="editAccount"
				/>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script lang="ts" setup>
import { useAccountsStore } from "./useAccountsStore";
import {
	useAccountTypesQuery,
	useCurrenciesQuery,
	useAccountsQuery,
} from "./queries";
import { useEditAccountMutation } from "./mutations";
import type { Account } from "shared";

const accountsStore = useAccountsStore();

const { data: currencies, isPending: isCurrenciesLoading } =
	useCurrenciesQuery();
const { data: accountTypes, isPending: isAccountTypesLoading } =
	useAccountTypesQuery();
const { data: accounts } = useAccountsQuery();

const activeAccount = computed(() => {
	return accounts.value?.find(
		(account) => account.id === accountsStore.activeAccountId
	);
});

const formData = reactive<Account>({
	id: "",
	name: "",
	type: "",
	currency: "",
	balance: 0,
	initialBalance: 0,
	status: "",
	createdDate: "",
	closedDate: "",
	lastTransactionDate: "",
	note: "",
});

// Automatically update form when active account changes or modal is opened
watchEffect(() => {
	if (accountsStore.editAccountModal && activeAccount.value) {
		const precision = activeAccount.value.type === "crypto" ? 8 : 2;
		const initialBalance =
			activeAccount.value.initialBalance / Math.pow(10, precision);

		Object.assign(formData, {
			...activeAccount.value,
			initialBalance,
		});
	}
});

const hasTransactions = computed(() => Boolean(formData.lastTransactionDate));

const currencyList = computed(() => {
	return formData.type === "crypto"
		? currencies.value.crypto
		: currencies.value.regular;
});

// Reset currency when type changes
watch(currencyList, () => {
	formData.currency = "";
});

const precision = computed(() => {
	return formData.type === "crypto" ? 8 : 2;
});

const { mutate, isPending: isEditingAccount } = useEditAccountMutation();

const editAccount = () => {
	const initialBalance =
		(formData.initialBalance ?? 0) * Math.pow(10, precision.value);
	const balance = formData.lastTransactionDate
		? formData.balance
		: initialBalance;

	mutate(
		{
			...formData,
			initialBalance,
			balance,
		},
		{
			onSuccess: () => {
				// Close modal
				accountsStore.editAccountModal = false;

				// Reset form
				Object.assign(formData, {
					id: "",
					name: "",
					type: "",
					currency: "",
					balance: 0,
					initialBalance: 0,
					status: "",
					createdDate: "",
					closedDate: "",
					lastTransactionDate: "",
					note: "",
				});
			},
		}
	);
};
</script>
