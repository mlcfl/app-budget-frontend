import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Account } from "shared";
import { Api } from "~/api";

export const useEditAccountMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (body: Account) => Api.patch("/accounts", { body }),
		onSuccess(_, { id }) {
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
			queryClient.invalidateQueries({ queryKey: ["account", id] });
		},
	});
};
