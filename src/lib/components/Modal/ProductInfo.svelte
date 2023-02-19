<script lang="ts">
  import TemplateModal from "$lib/components/Modal/Template.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const interpretAmount = (offering) => {
    let amount: string;
    switch(offering.amount) {
      case 'PNT':
        amount = 'Pint';
        break;
      case 'HGAL':
        amount = 'Half gallon';
        break;
      case 'GAL':
        amount = 'Gallon';
        break;
      default:
        amount = offering.other_amt;
        break;
    }
    return amount;
  };

  const closeProductInfo = () => {
    dispatch("closeProductInfo");
  };

  export let product: any[];
</script>

<TemplateModal width="max-w-7xl" on:closeModal={closeProductInfo}>
  <h3 slot="header" class="product-info-name">{product.name}</h3>

  <img slot="productImage" src={product.img_src} alt={product.name} class="product-info-img" />

  <div slot="productDetails" class="product-info-details">
    <h4>Description</h4>
    <p>{product.description}</p>
    <h4>Prices</h4>
    <p>
      {#each product.offerings as offering}
        {interpretAmount(offering)} - {offering.price}
      {/each}
    </p>
  </div>
</TemplateModal>

<style lang="postcss">
  .product-info-name {
    @apply w-full font-IstokWeb font-bold text-7xl text-center text-navy-blue;
  }

  .product-info-img {
    @apply w-full object-cover;
  }

  .product-info-details {
    @apply w-full flex flex-col items-stretch font-IstokWeb text-navy-blue;
  }

  .product-info-details > h4 {
    @apply block py-2 text-start text-6xl;
  }

  .product-info-details > p {
    @apply block pb-2 text-start text-4xl;
  }
</style>
