<script lang="ts">
	import { goto } from '$app/navigation';
	import AddProduct from '$lib/components/Buttons/Add.svelte';
	import ProductList from '$lib/components/Product/Admin/List.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const addProduct = () => {
		goto('/admin/products/add');
	};

	const editProduct = (event: CustomEvent) => {
		goto(`/admin/products/${event.detail.product_id}`);
	};
</script>

<svelte:head>
	<title>Products | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="products-page-container">
	<div class="add-product-container">
		<div class="add-product">
			<AddProduct label="Add Product" on:add={addProduct} />
		</div>
	</div>
	<ProductList products={data.products} on:edit={editProduct} />
</div>

<style lang="postcss">
	.products-page-container {
		@apply w-screen min-h-screen flex flex-col items-center justify-start bg-[#CDD5EB] overflow-hidden overflow-y-auto;
	}

	.add-product-container {
		@apply w-screen flex flex-row items-center justify-center bg-[#CDD5EB];
	}
	.add-product {
		@apply w-full bg-[#CDD5EB] flex flex-row items-center justify-start max-w-[112rem] py-10;
	}
</style>
