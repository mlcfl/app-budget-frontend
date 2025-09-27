<template>
	<VDialog v-model="accountsStore.removeAccountModal" max-width="500">
		<VCard
			:title="$t('accounts.modals.removeAccount.title')"
			:text="
				$t('accounts.modals.removeAccount.warning', {
					name: activeAccount?.name,
				})
			"
		>
			<VDivider />
			<VCardActions class="bg-surface-light">
				<VBtn
					:text="$t('accounts.modals.cancelBtn')"
					variant="plain"
					:disabled="isDeletingAccount"
					@click="accountsStore.removeAccountModal = false"
				/>
				<VSpacer />
				<VBtn
					:text="$t('accounts.modals.removeAccount.actionBtn')"
					:loading="isDeletingAccount"
					:disabled="isDeletingAccount"
					@click="deleteAccount"
				/>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script lang="ts" setup>
import { useAccountsStore } from "./useAccountsStore";
import { useAccountsQuery } from "./queries";
import { useDeleteAccountMutation } from "./mutations";

const accountsStore = useAccountsStore();
const { data: accounts } = useAccountsQuery();
const activeAccount = computed(() => {
	return accounts.value?.find(
		(account) => account.id === accountsStore.activeAccountId
	);
});

const { mutate, isPending: isDeletingAccount } = useDeleteAccountMutation();

const deleteAccount = () => {
	mutate(accountsStore.activeAccountId, {
		onSuccess() {
			// Close modal
			accountsStore.removeAccountModal = false;
		},
	});
};
</script>
