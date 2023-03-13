<script lang="ts">
	import TemplateModal from '$lib/components/Modal/Template.svelte';
	// import Offering from '$lib/components/Product/Offering.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Product } from '$lib/types/product';

	const dispatch = createEventDispatcher();

	const closeProductInfo = () => {
		dispatch('closeProductInfo');
	};

	export let product: Product;
</script>

<TemplateModal
	width="max-w-7xl"
	on:closeModal={closeProductInfo}
	bgColor="bg-sky-blue"
>
	<div slot="body" class="product-info">
		<img src={product.img_src} alt={product.name} class="product-info-img">
		<div class="product-info-details">
			<div class="product-info-name">
				<h3>{product.name}</h3>
			</div>
			<div class="product-info-description">
				<p>{product.description}</p>
			</div>
			<div class="product-info-offerings">
				<!-- {#each product.offerings as offering} -->
					<!-- TODO: Fix size/offering select input -->
					<!-- <Offering amount={offering.amount} other_amt={offering.other_amt} price={offering.price} /> -->
				<!-- {/each} -->
			</div>
		</div>
	</div>
</TemplateModal>

<style lang="postcss">
	.product-info {
		@apply grid grid-cols-2 gap-x-6;
	}

	.product-info-img {
		@apply w-full h-full object-cover rounded-3xl shadow-xl;
	}

	.product-info-name {
		@apply w-full font-IstokWeb font-bold text-5xl text-start text-navy-blue;
	}

	.product-info-details {
		@apply w-full flex flex-col items-stretch font-IstokWeb text-navy-blue;
	}

	.product-info-description {
		@apply py-4 text-start text-xl;
	}

	.product-info-offerings {
		@apply grid grid-cols-3 justify-items-center pt-4;
	}
</style>
