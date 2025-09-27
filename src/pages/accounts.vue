<template>
	<VContainer max-width="1000px">
		<AccountsTable />
		<AddAccountModal />
		<EditAccountModal />
		<RemoveAccountModal />
	</VContainer>
</template>

<script lang="ts" setup>
import {
	AccountsTable,
	AddAccountModal,
	EditAccountModal,
	RemoveAccountModal,
} from "~/containers/accounts";
</script>
