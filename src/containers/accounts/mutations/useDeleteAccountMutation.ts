import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { Api } from "~/api";

export const useDeleteAccountMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (accountId: string) => Api.delete(`/accounts/${accountId}`),
		onSuccess(_, accountId) {
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
			queryClient.invalidateQueries({ queryKey: ["account", accountId] });
		},
	});
};
