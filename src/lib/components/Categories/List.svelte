<script lang="ts">
	import type { Category } from '$lib/types/category';
	import CategoryItem from '$lib/components/Categories/Category.svelte';

	export let width: string;
	export let categories: Category[];
	$: console.log(JSON.stringify(categories));
</script>

<div class="categ-list-container {width}">
	<div class="categ-list gap-x-8 gap-y-10 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		{#each categories as category}
			<CategoryItem name={category.name} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.categ-list-container {
		@apply flex flex-col min-w-min py-6 mt-10;
	}

	.categ-list {
		@apply w-full grid gap-x-20 gap-y-16;
	}
</style>
