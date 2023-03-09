<script lang="ts">
	import AddCategoryForm from '$lib/components/Forms/Category.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AddCategoryForm label="Add Category" formaction="/api/category/add" categories={data.categories} />
