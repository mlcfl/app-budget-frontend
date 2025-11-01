import { useQuery } from "@tanstack/vue-query";
import type { Category } from "shared";
import { Api } from "~/api";

export const useCategoriesQuery = () => {
	return useQuery<{ incomes: Category[]; expenses: Category[] }>({
		queryKey: ["categories"],
		initialData: { incomes: [], expenses: [] },
		queryFn: () => Api.get("/categories"),
	});
};
