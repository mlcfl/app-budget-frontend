<style lang="scss" module>
.liner {
	background: #00000022;
}
</style>

<template>
	<VSheet>
		<VTextField
			ref="input"
			v-model="category"
			variant="underlined"
			class="pa-3"
			label="New category"
			hide-details
			:disabled="isAdding"
			@keyup.enter="onAdd"
		>
			<template #append>
				<VBtn
					icon="mdi-plus"
					variant="flat"
					size="small"
					:loading="isAdding"
					@click="onAdd"
				/>
			</template>
		</VTextField>
		<VList>
			<Draggable
				v-model="items"
				:group
				item-key="id"
				handle=".draggable"
				:component-data="{
					type: 'transition-group',
				}"
				:ghost-class="$style.liner"
				@end="onOrderChanged"
			>
				<template #item="{ element }">
					<CategoryItem
						v-bind="element"
						:loading="isRemoving || isReordering"
						:loading-id="removingId"
						@remove="onRemove"
					/>
				</template>
			</Draggable>
		</VList>
	</VSheet>
</template>

<script lang="ts" setup>
import Draggable from "vuedraggable";
import type { Category } from "shared";
import CategoryItem from "./CategoryItem.vue";
import {
	useAddMutation,
	useRemoveMutation,
	useReorderMutation,
} from "../mutations";

const input = useTemplateRef<HTMLInputElement>("input");

const { data, group } = defineProps<{
	data: Category[];
	group: "incomes" | "expenses";
	loading: boolean;
}>();

const category = defineModel<string>("category");
const items = ref<Category[]>([...data]);

watch(
	() => data,
	(newData) => {
		items.value = [...newData];
	}
);

// Add a new category
const { mutate: addCategory, isPending: isAdding } = useAddMutation();
const onAdd = () => {
	if (!category.value) {
		return;
	}

	addCategory(
		{ title: category.value, type: group },
		{
			onSuccess: async () => {
				category.value = "";
				await nextTick();
				input.value?.focus();
			},
		}
	);
};

// Remove category
const removingId = ref<string | null>(null);
const { mutate: removeCategory, isPending: isRemoving } = useRemoveMutation();
const onRemove = ({ id }: Category) => {
	removingId.value = id;

	removeCategory(
		{ id, type: group },
		{
			onSettled: () => (removingId.value = null),
		}
	);
};

// Order was changed
const { mutate: reorderList, isPending: isReordering } = useReorderMutation();
const debouncedReorder = useDebounceFn(reorderList, 1500);
const onOrderChanged = () => {
	debouncedReorder({ type: group, list: items.value });
};
</script>
