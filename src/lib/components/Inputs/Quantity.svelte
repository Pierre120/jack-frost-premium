<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let quantity: number;

  const dispatch = createEventDispatcher();

  const decQty = () => {
    if (quantity > 1) {
      dispatch('decrement');
    }
  };

  const incQty = () => {
    dispatch('increment');
  };
</script>

<div class="quantity-input">
  <button class="dec-qty" type="button" on:click={decQty}>
    <span>-</span>
  </button>
  <div>{ quantity }</div>
  <button class="inc-qty" type="button" on:click={incQty}>
    <span>+</span>
  </button>
</div>

<style lang="postcss">
  .quantity-input {
    @apply flex items-center justify-center w-28 h-auto font-IstokWeb text-2xl rounded-md shadow-md;
  }

  .quantity-input > button {
    @apply w-8 h-8 text-white cursor-pointer text-3xl
      flex items-center justify-center;
  }

  .quantity-input > div {
    @apply grow w-8 h-8 bg-white text-center text-navy-blue;
  }

  .inc-qty {
    @apply bg-navy-blue hover:bg-primary-red pt-1 rounded-r-md;
  }

  .dec-qty {
    @apply bg-gray-300 hover:bg-gray-400 rounded-l-md;
  }
</style>