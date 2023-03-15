<script lang="ts">
	import type { PageData } from './$types';
	import ProductList from '$lib/components/Product/Client/List.svelte';
	import ProductInfo from '$lib/components/Modal/ProductInfo.svelte';
	import type { Product } from '$lib/types/product';

	const showProductInfo = async (event) => {
		let res = await fetch(`/api/products/${event.detail.productId}`);
		const { success, product: prodInfo } = await res.json();
		product = prodInfo;
		console.log('in menu page: ', product);
		console.log(success);
		if (success) {
			productInfoModal = true;
		}
	};

	const closeProductInfo = () => {
		productInfoModal = false;
		pId = '';
	};

	let pId = '';
	let productInfoModal = false;
	let product: Product;
	export let data: PageData;
</script>

<svelte:head>
	<title>Menu | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="product-list-container">
	<ProductList
		width="w-full md:max-w-[90%]"
		products={data.products}
		on:showItem={showProductInfo}
	/>
</div>

{#if productInfoModal}
	<ProductInfo {product} on:closeProductInfo={closeProductInfo} />
{/if}

<style lang="postcss">
	.product-list-container {
		@apply w-full bg-white flex flex-col justify-center items-center;
	}

	@media sceen and (min-width: 768px) {
		.product-list-container {
			@apply flex-row;
		}
	}
</style>
