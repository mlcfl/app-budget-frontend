<template>
	<VContainer max-width="1000px">
		<AccountsTable />
		<AddAccountModal />
	</VContainer>
</template>

<script lang="ts" setup>
import { AccountsTable, AddAccountModal } from "~/containers/accounts";
</script>
