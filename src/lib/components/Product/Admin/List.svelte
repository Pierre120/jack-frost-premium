<script lang="ts">
  import ProductItem from '$lib/components/Product/Admin/Item.svelte';
  import type { Product } from '$lib/types/product';
  import { createEventDispatcher } from 'svelte';

  export let products: Product[];

  const dispatch = createEventDispatcher();
  const edit = (event: CustomEvent) => {
    dispatch('edit', event.detail);
  };
</script>

<div class="w-screen bg-white flex flex-row items-center justify-center">
  <div class="product-list-container">
    <div class="product-list">
      {#each products as product}
        <ProductItem product={product} on:edit={edit} />
      {/each}
    </div>
  </div>
</div>

<style lang="postcss">
  .product-list-container {
    @apply w-full h-full max-w-[96rem];
  }

  .product-list {
    @apply w-full h-full grid grid-cols-3 gap-8;
  }
</style>