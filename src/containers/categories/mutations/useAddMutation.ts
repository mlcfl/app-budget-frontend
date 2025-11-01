import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Category } from "shared";
import { Api } from "~/api";

export const useAddMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (
			body: Omit<Category, "id"> & { type: "incomes" | "expenses" }
		) => Api.post("/categories", { body }),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};
