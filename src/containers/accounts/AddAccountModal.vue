<template>
	<VDialog v-model="accountsStore.addAccountModal" max-width="500">
		<VCard :title="$t('accounts.modals.addAccount.title')">
			<template #text>
				<VRow>
					<VCol cols="12">
						<VTextField
							v-model="formModel.name"
							:label="$t('accounts.modals.addAccount.name')"
							:disabled="isAddingAccount"
						/>
					</VCol>
					<VCol cols="12" md="6">
						<VSelect
							v-model="formModel.type"
							:label="$t('accounts.modals.addAccount.type')"
							:items="accountTypes"
							item-title="title"
							item-value="value"
							:loading="isAccountTypesLoading"
							:disabled="isAddingAccount"
						/>
					</VCol>
					<VCol cols="12" md="6">
						<VAutocomplete
							v-model="formModel.currency"
							:label="$t('accounts.modals.addAccount.currency')"
							:items="currencyList"
							:loading="isCurrenciesLoading"
							:disabled="isAddingAccount"
						/>
					</VCol>
					<VCol cols="12">
						<VNumberInput
							v-model="formModel.initialBalance"
							:min="0"
							:precision="precision"
							:label="$t('accounts.modals.addAccount.initialBalance')"
							:disabled="isAddingAccount"
						/>
					</VCol>
				</VRow>
				<VTextarea
					v-model="formModel.note"
					:label="$t('accounts.modals.addAccount.note')"
					:disabled="isAddingAccount"
				/>
			</template>
			<VDivider />
			<VCardActions class="bg-surface-light">
				<VBtn
					:text="$t('accounts.modals.addAccount.cancelBtn')"
					variant="plain"
					:disabled="isAddingAccount"
					@click="accountsStore.addAccountModal = false"
				/>
				<VSpacer />
				<VBtn
					:text="$t('accounts.modals.addAccount.addBtn')"
					:loading="isAddingAccount"
					:disabled="isAddingAccount"
					@click="addAccount"
				/>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script lang="ts" setup>
import type { Account } from "shared";
import { useAccountsStore } from "./useAccountsStore";
import { useAccountTypesQuery, useCurrenciesQuery } from "./queries";
import { useAddAccountMutation } from "./mutations";

const accountsStore = useAccountsStore();

const { data: currencies, isPending: isCurrenciesLoading } =
	useCurrenciesQuery();
const { data: accountTypes, isPending: isAccountTypesLoading } =
	useAccountTypesQuery();

const formModel = reactive<Partial<Account>>({
	name: "",
	type: "",
	currency: "",
	initialBalance: 0,
	note: "",
});

const currencyList = computed(() => {
	return formModel.type === "crypto"
		? currencies.value.crypto
		: currencies.value.regular;
});

// Reset currency when type changes
watch(currencyList, () => {
	formModel.currency = "";
});

const precision = computed(() => {
	return formModel.type === "crypto" ? 8 : 2;
});

const { mutate, isPending: isAddingAccount } = useAddAccountMutation();

const addAccount = () => {
	mutate(
		{
			...formModel,
			initialBalance:
				(formModel.initialBalance ?? 0) * Math.pow(10, precision.value),
		},
		{
			onSuccess: () => {
				// Close modal
				accountsStore.addAccountModal = false;

				// Reset form
				Object.assign(formModel, {
					name: "",
					type: "",
					currency: "",
					initialBalance: 0,
					note: "",
				});
			},
		}
	);
};
</script>
