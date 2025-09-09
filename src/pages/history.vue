<template>
	<div class="text-center">
		<div class="text-h5">{{ $t("nav.history") }}</div>
		<VBtn
			v-for="{ name, code } in locales"
			:key="code"
			@click="setLocale(code)"
		>
			{{ name }}
		</VBtn>
	</div>
</template>

<script lang="ts" setup>
const { locales, setLocale } = useI18n();
</script>
