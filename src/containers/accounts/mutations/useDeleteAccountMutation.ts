import { useMutation, useQueryClient } from "@tanstack/vue-query";

export const useDeleteAccountMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn(accountId: string) {
			return $fetch(`/api/accounts/${accountId}`, {
				method: "DELETE",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
			});
		},
		onSuccess(_, accountId) {
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
			queryClient.invalidateQueries({ queryKey: ["account", accountId] });
		},
	});
};
