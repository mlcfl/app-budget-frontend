<template>
	<div class="pa-4">
		<div class="text-h5 mb-4">Settings</div>
		<VCard>
			<VCardText>
				<VSwitch
					v-model="appStore.sidebarDrawerModel"
					:label="$t('settings.showSidebar')"
					color="primary"
					hide-details
				/>
			</VCardText>
		</VCard>
	</div>
</template>

<script lang="ts" setup>
const appStore = useAppStore();
</script>
