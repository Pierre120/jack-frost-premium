<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TemplateModal from '$lib/components/Modal/Template.svelte';

  const dispatch = createEventDispatcher();

  const close = () => {
    dispatch('close');
  }
</script>

<TemplateModal width="w-full max-w-7xl" on:closeModal={close} bgColor="bg-white">
  <div slot="header">
    <h1>Shopping Cart</h1>
    <hr>
  </div>
  <div slot="body">
    <div class="cart-items-container">
      <!-- TODO: create cart items list component -->
    </div>
    <div class="total-info">
      <p>Total: &#8369; 2050.00</p><!-- TODO: place amount variable -->
      <button type="button">Submit</button><!-- TODO: add on-click event handler -->
    </div>
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
</style>
      