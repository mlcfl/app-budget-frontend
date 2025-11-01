<template>
	<TabTemplate group="incomes" :data="data.incomes" :loading="isFetching" />
</template>

<script lang="ts" setup>
import TabTemplate from "./TabTemplate.vue";
import { useCategoriesQuery } from "../queries";

const { data, isFetching } = useCategoriesQuery();
</script>
