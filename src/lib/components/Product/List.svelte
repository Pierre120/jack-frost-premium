<script lang="ts">
	import ProductItem from '$lib/components/Product/Item.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Product } from '$lib/types/product';

	const dispatch = createEventDispatcher();
	const showItem = (event) => {
		dispatch('showItem', event.detail);
	};

	export let width: string;
	export let products: Product[];
</script>

<div class="product-list-container {width}">
	<!-- HEADER HERE  -->
	<div class="product-list">
		{#each products as product}
			<ProductItem
				name={product.name}
				image={product.img_src}
				productId={product.id}
				on:click={showItem}
			/>
		{/each}
	</div>
</div>

<style lang="postcss">
	.product-list-container {
		@apply flex flex-col min-w-min py-6;
	}

	.product-list {
		@apply w-full grid grid-cols-5 gap-x-8 gap-y-10;
	}
</style>
