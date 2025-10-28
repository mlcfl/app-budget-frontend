import { useQuery } from "@tanstack/vue-query";
import { Api } from "~/api";

export const useAccountTypesQuery = () => {
	const { t } = useI18n();

	return useQuery<string[], Error, { title: string; value: string }[]>({
		queryKey: ["account-types"],
		initialData: [],
		queryFn: () => Api.get("/account-types"),
		select(data) {
			return data.map((value) => ({
				value,
				title: t(`accounts.modals.accountTypes.${value}`),
			}));
		},
	});
};
