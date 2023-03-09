<script lang="ts">
	import AddProductForm from '$lib/components/Forms/Product.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AddProductForm label="Add Product" formaction="/api/products/add" categories={data.categories} />
