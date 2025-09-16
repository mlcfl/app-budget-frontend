<template>
	<VApp>
		<VNavigationDrawer v-model="navDrawer" location="start" :temporary="mobile">
			<VSheet height="64px" />
			<VDivider />
			<VList :items="nav" />
		</VNavigationDrawer>
		<VNavigationDrawer
			v-model="appStore.sidebarDrawerModel"
			location="end"
			:temporary="mobile"
		>
			<VSheet height="64px" />
			<VDivider />
			<slot name="sidebar" />
		</VNavigationDrawer>
		<VAppBar elevation="0" class="border-b-thin">
			<VAppBarNavIcon v-if="mobile" @click="navDrawer = !navDrawer" />
			<VAppBarTitle>{{ currentPageTitle }}</VAppBarTitle>
		</VAppBar>
		<VMain>
			<slot />
		</VMain>
	</VApp>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();

// Navigation sidebar
const nav = useNav();
const navDrawer = shallowRef(!mobile.value);

// Sidebar right
const appStore = useAppStore();

// Get title of current page from navigation
const route = useRoute();
const currentPageTitle = computed(() => {
	const currentPath = route.path;
	const currentNavItem = nav.value.find((item) =>
		currentPath.startsWith(item.props?.to ?? "")
	);

	return currentNavItem?.title ?? "";
});

// Update title in browser
useHead({ title: currentPageTitle });
</script>
