<template>
	<VContainer max-width="1000px">
		<AccountsTable />
		<AddAccountModal />
		<EditAccountModal />
	</VContainer>
</template>

<script lang="ts" setup>
import {
	AccountsTable,
	AddAccountModal,
	EditAccountModal,
} from "~/containers/accounts";
</script>
