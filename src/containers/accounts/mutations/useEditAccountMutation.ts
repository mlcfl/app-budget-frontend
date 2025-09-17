import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Account } from "shared";

export const useEditAccountMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn(form: Account) {
			return $fetch("/api/accounts", {
				method: "PATCH",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
				body: form,
			});
		},
		onSuccess(_, { id }) {
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
			queryClient.invalidateQueries({ queryKey: ["account", id] });
		},
	});
};
