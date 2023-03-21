<script lang="ts">
  import QuantityInput from '$lib/components/Inputs/Quantity.svelte';
  import RemoveButton from '$lib/components/Buttons/Remove.svelte';
  import {
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItemFromCart,
  } from '$lib/stores/cart';
  import type { CartItem } from "$lib/types/cart";
  import { fade, slide } from 'svelte/transition';
  // import { createEventDispatcher } from 'svelte';

  // const dispatch = createEventDispatcher();

  const incQuantity = () => {
    incrementCartItemQuantity(cartItem.product.id, cartItem.offering.id as string);
  };

  const decQuantity = () => {
    decrementCartItemQuantity(cartItem.product.id, cartItem.offering.id as string)
  };

  const removeItem = () => {
    removeCartItemFromCart(cartItem.product.id, cartItem.offering.id as string);
  };
  
  export let cartItem: CartItem;
</script>

<div class="cart-item-container" transition:slide>
  <img src={cartItem.product.img_src} alt={cartItem.product.name}>
  <div class="item-info">
    <div class="item-header">
      <h3>{ cartItem.product.name }</h3>
      <p>&#8369; { cartItem.offering.price.toFixed(2) }</p>
    </div>
    <h4>{ cartItem.offering.size_name }</h4>
    <p>{ cartItem.product.description }</p>
  </div>
  <div class="item-edits">
    <QuantityInput quantity={cartItem.quantity} on:increment={incQuantity} on:decrement={decQuantity} />
    <RemoveButton label='' on:remove={removeItem} />
  </div>
</div>

<style lang="postcss">
  .cart-item-container {
    @apply w-full flex items-stretch justify-center gap-6;
  }

  .cart-item-container > img {
    @apply w-1/4 h-auto object-cover rounded-md shadow-sm;
  }

  .item-info {
    @apply grow flex flex-col items-stretch justify-center font-IstokWeb text-navy-blue;
  }

  .item-header {
    @apply w-full flex flex-row items-center justify-between text-3xl font-bold;
  }

  .item-info > h4 {
    @apply w-full text-sm text-gray-500 pt-1 pb-2;
  }

  .item-info > p {
    @apply grow w-full max-w-full h-full text-base text-gray-500 py-1 text-ellipsis;
  }

  .item-edits {
    @apply flex flex-col items-center justify-start gap-4;
  }
</style>
