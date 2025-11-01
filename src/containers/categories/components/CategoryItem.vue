<style lang="scss" module>
.title {
	user-select: none;
}

.dnd {
	cursor: grab;

	&:active {
		cursor: grabbing;
	}
}
</style>

<template>
	<VListItem class="border-b-thin">
		<VSheet class="d-flex justify-space-between align-center ga-1">
			<VIcon
				icon="mdi-drag-vertical"
				:class="['draggable', $style.dnd]"
				:disabled="loading"
			/>
			<VListItemTitle :class="['w-100 text-truncate', $style.title]">{{
				title
			}}</VListItemTitle>
			<VBtn
				icon="mdi-close"
				variant="text"
				size="x-small"
				:loading="loading && id === loadingId"
				:disabled="loading"
				@click="$emit('remove', { id, title })"
			/>
		</VSheet>
	</VListItem>
</template>

<script lang="ts" setup>
import type { Category } from "shared";

defineProps<
	Category & {
		loading: boolean;
		loadingId: string | null;
	}
>();

defineEmits<{
	remove: [Category];
}>();
</script>
