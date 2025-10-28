import { useQuery } from "@tanstack/vue-query";
import { Api } from "~/api";

export const useCurrenciesQuery = () =>
	useQuery<{ regular: string[]; crypto: string[] }>({
		queryKey: ["currencies"],
		initialData: { regular: [], crypto: [] },
		queryFn: () => Api.get("/currencies"),
	});
