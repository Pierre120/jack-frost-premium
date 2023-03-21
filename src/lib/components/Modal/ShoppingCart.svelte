<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CartItemList from "$lib/components/Cart/List.svelte";
  import TemplateModal from '$lib/components/Modal/Template.svelte';
  import type { Cart } from "$lib/types/cart";

  const dispatch = createEventDispatcher();

  const close = () => {
    dispatch('close');
  }

  export let cart: Cart;
</script>

<TemplateModal width="w-full max-w-7xl" on:closeModal={close} bgColor="bg-white">
  <div slot="header">
    <h1>Shopping Cart</h1>
    <hr>
  </div>
  <div slot="body" class="{ cart.items.length === 0 ? 'empty' : ''}">
    {#if cart.items.length === 0}
      <p>Your Shopping Cart is empty.</p>
    {:else}
      <div class="cart-items-container">
        <CartItemList items={cart.items} />
      </div>
      <div class="total-info">
        <p>Total: &#8369; { cart.total.toFixed(2) }</p>
        <button type="button">Submit</button><!-- TODO: add on-click event handler -->
      </div>
    {/if}
  </div>
</TemplateModal>
  
<style lang="postcss">
  h1 {
    @apply block font-IstokWeb text-navy-blue 
      font-bold text-5xl text-center pb-4;
  }

  hr {
    @apply border-2 border-navy-blue;
  }

  .cart-items-container {
    @apply w-full;
  }

  .total-info {
    @apply w-full flex items-center justify-between font-IstokWeb;
  }

  .total-info > p {
    @apply text-3xl text-navy-blue;
  }

  .total-info > button {
    @apply px-12 py-3 text-2xl text-white bg-navy-blue rounded-md shadow-md cursor-pointer;
  }

  .empty {
    @apply w-full h-40 flex flex-col items-center justify-center font-IstokWeb text-2xl text-navy-blue;
  }
</style>
      