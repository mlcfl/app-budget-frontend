import { useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Account } from "shared";

export const useAddAccountMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn(form: Partial<Account>) {
			return $fetch("/api/accounts", {
				method: "POST",
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
				body: form,
			});
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["accounts"] });
		},
	});
};
