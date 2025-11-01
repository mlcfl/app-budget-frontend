import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Category } from "shared";
import { Api } from "~/api";

export const useReorderMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			list,
			type,
		}: {
			list: Category[];
			type: "incomes" | "expenses";
		}) => Api.put(`/categories/${type}`, { body: { list } }),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};
