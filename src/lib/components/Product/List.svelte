<script lang="ts">
  import ProductItem from "$lib/components/Product/Item.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const showItem = (event: CustomEvent) => {
    dispatch("showItem", event.detail);
  };

  export let products: any[];
</script>

<div class="product-list-container">
  <!-- HEADER HERE  -->
  <div class="product-list">
    {#each products as product}
      <ProductItem
        name={product.name}
        image={product.image}
        productId={product.id}
        on:showItem={showItem}
      />
    {/each}
  </div>
</div>

<style lang="postcss">
  .product-list-container {
    @apply flex flex-col min-w-min w-full py-6;
  }

  .product-list {
    @apply w-full grid-cols-5 gap-x-8 gap-y-10;
  }
</style>