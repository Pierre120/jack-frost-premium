<script lang="ts">
	import { goto } from '$app/navigation';
	import AddProduct from '$lib/components/Buttons/Add.svelte';
	import ProductList from '$lib/components/Product/Admin/List.svelte';
  import type { PageData } from './$types';

	export let data: PageData

	const addProduct = () => {
		goto('/admin/products/add');
	};

	const editProduct = (event: CustomEvent) => {
		goto(`/admin/products/edit/${event.detail.product_id}`);
	};
</script>

<div class="block">
	<AddProduct label="Add Product" on:add={addProduct} />
</div>
<ProductList products={data.products} on:edit={editProduct} />
