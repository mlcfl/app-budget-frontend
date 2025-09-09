import { useQuery } from "@tanstack/vue-query";

export const useAccountTypesQuery = () => {
	const { t } = useI18n();

	return useQuery<string[], Error, { title: string; value: string }[]>({
		queryKey: ["account-types"],
		initialData: [],
		queryFn() {
			return $fetch("/api/account-types", {
				method: "GET",
				server: false,
				lazy: true,
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
			});
		},
		select(data) {
			return data.map((value) => ({
				value,
				title: t(`accounts.modals.addAccount.accountTypes.${value}`),
			}));
		},
	});
};
