<template>
	<TabTemplate group="expenses" :data="data.expenses" :loading="isFetching" />
</template>

<script lang="ts" setup>
import TabTemplate from "./TabTemplate.vue";
import { useCategoriesQuery } from "../queries";

const { data, isFetching } = useCategoriesQuery();
</script>
