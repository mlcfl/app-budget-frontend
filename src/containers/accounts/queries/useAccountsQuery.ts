import { useQuery } from "@tanstack/vue-query";
import type { Account } from "shared";

export const useAccountsQuery = () =>
	useQuery<Account[]>({
		queryKey: ["accounts"],
		initialData: [],
		queryFn() {
			return $fetch("/api/accounts", {
				method: "GET",
				server: false,
				lazy: true,
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
			});
		},
	});
