import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Account } from "shared";
import { Api } from "~/api";

export const useAddAccountMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (body: Partial<Account>) => Api.post("/accounts", { body }),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
		},
	});
};
