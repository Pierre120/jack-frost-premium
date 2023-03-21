<script lang="ts">
	import TemplateModal from '$lib/components/Modal/Template.svelte';
	import QuantityInput from '$lib/components/Inputs/Quantity.svelte';
	// import Offering from '$lib/components/Product/Offering.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Product } from '$lib/types/product';
  import type { Offering } from '$lib/types/offering';
	import { addProductToCart } from '$lib/stores/cart';

	const dispatch = createEventDispatcher();

	const closeProductInfo = () => {
		dispatch('closeProductInfo');
	};

	const incQuantity = () => {
		quantity++;
	}

	const decQuantity = () => {
		if (quantity > 1) {
			quantity--;
		}
	}

	const addToCart = () => {
		addProductToCart(product, selectedOffering, quantity);
	}

	let quantity = 1;
	let selectedOffering = {} as Offering;
	let isSelecting = false;

	export let product: Product;
	export let offerings: Offering[];
</script>

<TemplateModal width="max-w-7xl" on:closeModal={closeProductInfo} bgColor="bg-white">
	<div slot="body" class="product-info">
		<img src={product.img_src} alt={product.name} class="product-info-img" />
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
				<!-- Quantity -->
				<div class="quantity-info">
					<p>Quantity: </p>
					<QuantityInput quantity={quantity} on:increment={incQuantity} on:decrement={decQuantity} />
				</div>

				<!-- Offering choices -->
				<div class="offerings">
					<button class="offering-input" type="button" on:click={() => isSelecting = !isSelecting }>
						<div>
							<span>{ selectedOffering.size_name ?? 'Select Size' }</span>
							<span>
								{#if selectedOffering.price}
									&#8369; { selectedOffering.price }
								{:else}
									---
								{/if}
							</span>
						</div>
						<!-- TODO: Add SVG icon -->
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9ca3af" class="w-6 h-6 justify-self-end">
							<path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clip-rule="evenodd" />
						</svg>					
					</button>
					<div class="offering-choices { isSelecting ? 'grid': 'hidden' }">
						{#each offerings as offering}
							<div>
								<div role="button" on:click={() => {
									selectedOffering = offering;
									isSelecting = false;
								}} on:keypress={() => {}}>
									<span>{ offering.size_name }</span>
									<span>&#8369; { offering.price }</span>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<button class="add-to-cart-btn" type="button" on:click={addToCart}>Add to cart</button>
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
		@apply w-full h-full flex flex-col items-stretch font-IstokWeb text-navy-blue;
	}

	.product-info-description {
		@apply py-4 text-start text-xl grow;
	}

	.product-info-offerings {
		@apply w-full flex flex-col items-stretch;
	}

	.quantity-info {
		@apply w-full flex flex-row gap-8 items-center justify-start
			font-IstokWeb text-xl text-navy-blue py-4;
	}

	.offerings {
		@apply w-full inline-block relative; /* flex flex-col items-stretch */
	}

	.offering-input {
		@apply border-2 border-navy-blue rounded-md bg-white;
	}

	.offering-choices {
		@apply w-full absolute z-40 border-x-2 border-b-2 border-gray-100 rounded-b-md bg-white;
	}

	.offering-input, .offering-choices > div {
		@apply w-full p-4 grid grid-cols-8 gap-8 content-center justify-items-stretch
			font-IstokWeb text-xl text-navy-blue cursor-pointer;
	}

	.offering-input > div, .offering-choices > div > div {
		@apply col-span-7 flex items-center justify-between;
	}

	.offering-choices > div {
		@apply hover:bg-gray-100;
	}

	.add-to-cart-btn {
		@apply w-full p-4 mt-4 font-IstokWeb text-xl text-white bg-navy-blue hover:bg-primary-red rounded-md;
	}
</style>
