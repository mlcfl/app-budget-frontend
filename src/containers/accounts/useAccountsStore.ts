import { defineStore } from "pinia";
import type { Account } from "shared";

export const useAccountsStore = defineStore("accounts", () => {
	const activeAccountId = ref<Account["id"]>("");
	const selectedAccounts = ref<Account[]>([]);

	const addAccountModal = ref(false);
	const editAccountModal = ref(false);
	const removeAccountModal = ref(false);

	return {
		activeAccountId,
		selectedAccounts,
		addAccountModal,
		editAccountModal,
		removeAccountModal,
	};
});
