import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Category } from "shared";
import { Api } from "~/api";

export const useRemoveMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			type,
		}: Omit<Category, "title"> & { type: "incomes" | "expenses" }) =>
			Api.delete(`/categories/${type}/${id}`),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};
