<script lang="ts">
	export let name: string;
	import EditCategory from '$lib/components/Buttons/Edit.svelte';
	import { goto } from '$app/navigation';

	const editCategory = () => {
		goto('/admin/categories/edit');
	};
</script>

<div class="categ-container">
	<div class="categ-name">
		<h1>{name}</h1>
	</div>
	<div class="edit-button-specs">
		<EditCategory on:edit={editCategory} />
	</div>
</div>

<style lang="postcss">
	.categ-container {
		@apply flex flex-row min-w-min w-full bg-white shadow-xl;
	}

	.categ-name {
		@apply w-full min-w-min ml-4 font-Itim text-2xl uppercase font-semibold flex justify-start mb-2 sm:mb-0 sm:mr-4;
	}

	.edit-button-specs {
		@apply ml-4 bg-white hover:bg-indigo-200 text-white font-bold py-2 px-4 rounded;
	}

	.categ-name > h1 {
		@apply p-2 text-center text-indigo-900 hover:text-dark-navy-blue cursor-pointer;
	}
</style>
