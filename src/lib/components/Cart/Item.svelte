<script lang="ts">
  import QuantityInput from '$lib/components/Inputs/Quantity.svelte';
  import RemoveButton from '$lib/components/Buttons/Remove.svelte';
  import type { CartItem } from "$lib/types/cart";

  export let cartItem: CartItem;
</script>

<div class="cart-item-container">
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
    <QuantityInput quantity={cartItem.quantity} />
    <RemoveButton label='' />
  </div>
</div>

<style lang="postcss">
  .cart-item-container {
    @apply w-full flex items-center justify-center gap-4;
  }

  .cart-item-container > img {
    @apply w-1/4 h-32 object-cover rounded shadow-sm;
  }

  .item-info {
    @apply grow flex flex-col items-stretch justify-center font-IstokWeb text-navy-blue;
  }

  .item-header {
    @apply w-full flex flex-row items-center justify-between text-3xl;
  }

  .item-info > h4 {
    @apply w-full block text-sm text-gray-500 pt-1 pb-2;
  }

  .item-info > p {
    @apply w-full h-full block text-base text-gray-500 py-1 truncate;
  }

  .item-edits {
    @apply w-1/4 flex flex-col items-start justify-center;
  }
</style>
