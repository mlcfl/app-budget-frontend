import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
	const sidebarDrawer = ref(false);

	const toggleSidebarDrawer = () => {
		sidebarDrawer.value = !sidebarDrawer.value;
	};

	const setSidebarDrawer = (value: boolean) => {
		sidebarDrawer.value = value;
	};

	const sidebarDrawerModel = computed({
		get: () => sidebarDrawer.value,
		set: (value: boolean) => setSidebarDrawer(value),
	});

	return {
		sidebarDrawer: readonly(sidebarDrawer),
		sidebarDrawerModel,

		toggleSidebarDrawer,
		setSidebarDrawer,
	};
});
