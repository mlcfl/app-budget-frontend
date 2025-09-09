export const useNav = () => {
	const { t } = useI18n();

	const nav = computed(() => [
		{
			title: t("nav.history"), // список записей (календарь, фильтры, сортировка, группировка)
			props: {
				to: "/history",
				prependIcon: "mdi-history",
			},
		},
		{
			title: t("nav.accounts"), // где хранятся (карты, налик, под подушкой и тд)
			props: {
				to: "/accounts",
				prependIcon: "mdi-wallet-outline",
			},
		},
		{
			title: t("nav.categories"), // откуда приходят (источники) и куда уходят (категории расходов) (с подкатегориями)
			props: {
				to: "/categories",
				prependIcon: "mdi-format-list-bulleted",
			},
		},
		{
			title: t("nav.debts"), // Я должен и мне должны (2 вкладки)
			props: {
				to: "/debts",
				prependIcon: "mdi-account-outline",
			},
		},
		{
			type: "divider",
		},
		{
			title: t("nav.settings"),
			props: {
				to: "/settings",
				prependIcon: "mdi-cog-outline",
			},
		},
	]);

	return nav;
};
