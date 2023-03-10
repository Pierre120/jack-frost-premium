<script lang="ts">
	import EditCategoryForm from '$lib/components/Forms/Category.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<EditCategoryForm label="Edit Category" formaction="/api/category/edit" categories={data.categories} hasDeleteButton= {true} />
