<template>
	<VDataTable
		v-model="accountsStore.selectedAccounts"
		:headers="headers"
		:hide-default-footer="processedData.length <= 10"
		:items="processedData"
		:loading="isPending"
		item-value="id"
		show-select
		hover
		@click:row="onRowClick"
	>
		<template #top>
			<VSheet class="d-flex justify-end">
				<VBtn
					variant="outlined"
					prepend-icon="mdi-plus"
					:text="$t('accounts.addAccountBtn')"
					@click="addAccount"
				/>
			</VSheet>
		</template>
		<template v-slot:item.actions="{ item }">
			<div class="d-flex ga-2 justify-end">
				<VBtn
					variant="text"
					color="medium-emphasis"
					icon="mdi-pencil"
					size="small"
					@click.stop="editAccount(item.id)"
				/>
				<VBtn
					variant="text"
					color="medium-emphasis"
					icon="mdi-delete"
					size="small"
					@click.stop="removeAccount(item.id)"
				/>
			</div>
		</template>
		<template #no-data>
			<VSheet>{{ $t("accounts.noAccountsFound") }}</VSheet>
		</template>
	</VDataTable>
</template>

<script lang="ts" setup>
import type { Account } from "shared";
import { useAccountsStore } from "./useAccountsStore";
import { useAccountsQuery } from "./queries";

const { t } = useI18n();
const accountsStore = useAccountsStore();
const headers = [
	{
		title: "Name",
		key: "name",
	},
	{
		title: "Type",
		key: "type",
	},
	{
		title: "Currency",
		key: "currency",
	},
	{
		title: "Balance",
		key: "balance",
	},
	{
		title: "Initial balance",
		key: "initialBalance",
	},
	{
		title: "Status",
		key: "status",
	},
	{
		title: "Created date",
		key: "createdDate",
	},
	{
		title: "Closed date",
		key: "closedDate",
	},
	{
		title: "Last transaction date",
		key: "lastTransactionDate",
	},
	{
		title: "Notes",
		key: "note",
	},
	{
		title: "Actions",
		key: "actions",
		align: "end" as const,
		sortable: false,
	},
];

const { data, isPending } = useAccountsQuery();

const processedData = computed(() => {
	return (
		data.value?.map((account) => ({
			...account,
			type: t(`accounts.modals.addAccount.accountTypes.${account.type}`),
			balance: formatBalance(account.balance, account.type),
			initialBalance: formatBalance(account.initialBalance, account.type),
			createdDate: formatDate(account.createdDate),
			closedDate: formatDate(account.closedDate),
			lastTransactionDate: formatDate(account.lastTransactionDate),
		})) || []
	);
});

const formatBalance = (balance: number, type: string) => {
	const divisor = type === "crypto" ? Math.pow(10, 8) : Math.pow(10, 2);
	return balance / divisor;
};

const formatDate = (date: Date | string): string => {
	if (!date) {
		return "";
	}

	date = date instanceof Date ? date : new Date(date);
	return new Intl.DateTimeFormat("ru-RU", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	})
		.format(date)
		.replace(/(\d{2})\.(\d{2})\.(\d{4})/, "$3.$2.$1"); // YYYY.MM.DD
};

const onRowClick = (e: PointerEvent, { item }: { item: Account }) => {
	console.log("onRowClick", item);
};

const addAccount = () => {
	accountsStore.addAccountModal = true;
};

const editAccount = (id: string) => {
	console.log(id);
	accountsStore.activeAccountId = id;
	accountsStore.editAccountModal = true;
};

const removeAccount = (id: string) => {
	console.log(id);
	accountsStore.activeAccountId = id;
	accountsStore.removeAccountModal = true;
};
</script>
