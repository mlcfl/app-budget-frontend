import { useQuery } from "@tanstack/vue-query";
import type { Account } from "shared";
import { Api } from "~/api";

export const useAccountsQuery = () =>
	useQuery<Account[]>({
		queryKey: ["accounts"],
		initialData: [],
		queryFn: () => Api.get("/accounts"),
	});
