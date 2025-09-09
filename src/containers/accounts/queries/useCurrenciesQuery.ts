import { useQuery } from "@tanstack/vue-query";

export const useCurrenciesQuery = () =>
	useQuery<{ regular: string[]; crypto: string[] }>({
		queryKey: ["currencies"],
		initialData: { regular: [], crypto: [] },
		queryFn() {
			return $fetch("/api/currencies", {
				method: "GET",
				server: false,
				lazy: true,
				headers: {
					"X-Requested-With": "XMLHttpRequest",
				},
			});
		},
	});
