<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import AddCategory from '$lib/components/Buttons/Add.svelte';
	import CategList from '$lib/components/Categories/List.svelte';

	export let data: PageData;

	const addCategory = () => {
		goto('/admin/categories/add');
	};

	const editCategory = (event: CustomEvent) => {
		goto(`/admin/categories/${event.detail.category_id}`);
	};
</script>

<svelte:head>
	<title>Categories | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="categ-list-container min-h-screen">
	<div class="add-categ-button w-5/6 mr-24">
		<AddCategory label={'Add Category'} on:add={addCategory} />
	</div>
	<CategList width="w-full md:max-w-[90%]" categories={data.categs} on:edit={editCategory} />
</div>

<style lang="postcss">
	.categ-list-container {
		@apply w-full h-full bg-indigo-200 flex flex-col items-center justify-start;
	}

	@media sceen and (min-width: 768px) {
		.categ-list-container {
			@apply h-full flex-row;
		}
	}

	.add-categ-button {
		@apply mt-6;
	}
</style>
