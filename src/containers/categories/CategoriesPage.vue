<style lang="scss" module>
.container {
	padding-inline: 16px;
}

.foo {
	display: flex;
	max-width: 640px;
	width: 100%;
	margin-inline: auto;
	gap: 8px;
}

.tab {
	max-width: 320px;
	width: 100%;
}

.title {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-inline: 16px;
	border-bottom-width: thin;
	height: 48px;
}
</style>

<template>
	<VSheet :class="[$style.container, { 'pa-0': mobile }]">
		<VSheet v-if="!mobile" :class="$style.foo">
			<VSheet :class="['flex-fill', $style.tab]">
				<VSheet :class="['text-button', $style.title]">{{
					$t("categories.tabs.incomes")
				}}</VSheet>
				<IncomesTab />
			</VSheet>
			<VDivider :vertical="true" />
			<VSheet :class="['flex-fill', $style.tab]">
				<VSheet :class="['text-button', $style.title]">{{
					$t("categories.tabs.expenses")
				}}</VSheet>
				<ExpensesTab />
			</VSheet>
		</VSheet>

		<VCard v-else elevation="0">
			<VTabs v-model="tab" grow>
				<VTab value="incomes">{{ $t("categories.tabs.incomes") }}</VTab>
				<VTab value="expenses">{{ $t("categories.tabs.expenses") }}</VTab>
			</VTabs>
			<VTabsWindow v-model="tab">
				<VTabsWindowItem value="incomes">
					<IncomesTab />
				</VTabsWindowItem>
				<VTabsWindowItem value="expenses">
					<ExpensesTab />
				</VTabsWindowItem>
			</VTabsWindow>
		</VCard>
	</VSheet>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { IncomesTab, ExpensesTab } from "./components";

const { mobile } = useDisplay();

const tab = ref(null);
</script>
