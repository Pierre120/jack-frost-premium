<script lang="ts">
  import TemplateModal from "$lib/components/Modal/Template.svelte";
  import Offering from "$lib/components/Product/Offering.svelte";
  import { createEventDispatcher } from "svelte";
  import type { Product } from "$lib/types/product";

  const dispatch = createEventDispatcher();

  const closeProductInfo = () => {
    dispatch("closeProductInfo");
  };

  export let product: Product;
</script>

<TemplateModal width="max-w-7xl" on:closeModal={closeProductInfo} productImgSrc={product.img_src} bgColor="bg-sky-blue">
  <div slot="productDetails" class="product-info-details">
    <div class="product-info-name">
      <h3>{product.name}</h3>
    </div>
    <div class="product-info-description">
      <p>{product.description}</p>
    </div>
    <div class="product-info-offerings">
      {#each product.offerings as offering}
        <Offering amount={offering.amount} other_amt={offering.other_amt} price={offering.price} />
      {/each}
    </div>
  </div>
</TemplateModal>

<style lang="postcss">
  .product-info-name {
    @apply w-full font-IstokWeb font-bold text-5xl text-start text-navy-blue;
  }

  .product-info-img {
    @apply w-full object-fill rounded-3xl;
  }

  .product-info-details {
    @apply w-full flex flex-col items-stretch font-IstokWeb text-navy-blue;
  }

  .product-info-description {
    @apply py-4 text-start text-xl;
  }

  .product-info-offerings {
    @apply grid grid-cols-3 justify-items-center pt-4;
  }
</style>
