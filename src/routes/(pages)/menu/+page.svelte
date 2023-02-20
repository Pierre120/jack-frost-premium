<script lang="ts">
  import type { PageData } from "./$types";
  import ProductList from "$lib/components/Product/List.svelte";
  import ProductItem from "$lib/components/Product/Item.svelte";
  import ProductInfo from "$lib/components/Modal/ProductInfo.svelte";
  import type { Product } from "$lib/types/product";

  const showProductInfo = async (event) => {
    let res = await fetch(`/api/menu/${event.detail.productId}`);
    product = await res.json();
    productInfoModal = true;
  };

  const closeProductInfo = () => {
    productInfoModal = false;
    pId = '';
  };

  let pId = '';
  let productInfoModal = false;
  let product: Product
  export let data: PageData;
</script>

<svelte:head>
  <title>Menu | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="product-list-container">
  <ProductList
    width="max-w-[90%]"
    products={data.products}
    on:showItem={showProductInfo}
  />
</div>

{#if productInfoModal}
  <ProductInfo
    product={product}
    on:closeProductInfo={closeProductInfo}
  />
{/if}

<style lang="postcss">
  .product-list-container {
    @apply w-full bg-white flex justify-center items-center;
  }
</style>
