<script lang="ts">
  import EditButton from '$lib/components/Buttons/Edit.svelte';
  import type { Product } from "$lib/types/product";
  import { createEventDispatcher } from 'svelte';

  export let product: Product;

  const dispatch = createEventDispatcher();
  const edit = () => {
    dispatch('edit', { product_id: product.id });
  };
</script>

<div class="product-card">
  <figure><img src={product.img_src} alt={product.name}></figure>
  <div class="info">
    <div class="header">
      <h3 class="name">{product.name}</h3>
      <EditButton on:edit={edit} />
    </div>
    <div class="desc-container">
      <p class="description">{product.description}</p>
    </div>
  </div>
</div>

<style lang="postcss">
  .product-card {
    @apply grid grid-cols-3 w-full h-full min-h-max max-h-64 p-3 gap-3 bg-white rounded shadow-lg;
  }

  .product-card > figure {
    @apply col-span-1 h-full rounded overflow-hidden shadow-sm;
  }

  .product-card > figure > img {
    @apply w-full h-full object-cover;
  }

  .product-card > .info {
    @apply col-span-2 flex flex-col font-IstokWeb;
  }

  .product-card > .info > .header {
    @apply flex flex-row w-full justify-between items-center;
  }

  .product-card > .info > .header > .name {
    @apply grow pr-2 text-3xl text-dark-blue font-bold truncate;
  }

  .product-card > .info > .desc-container {
    @apply w-full grow pt-2;
  }

  .product-card > .info > .desc-container > .description {
    @apply text-base text-[#666666] truncate;
  }
</style>
