<script lang="ts">
  import type { Cart, CartItem } from "$lib/types/cart";
  import type { OrderDetails } from "$lib/types/order";

  const toProduct = (item: CartItem) => {
    switch(item.offering.size_name.toLowerCase()) {
      case "pint":
        return item.product.name + "-PNT";
      case "half-gallon":
        return item.product.name + "-HG";
      case "half gallon":
        return item.product.name + "-HG";
      case "gallon":
        return item.product.name + "-GL";
      case "less sugar":
        return item.product.name + "-LS";
      default:
        return item.product.name;
    }
  };

  export let items: CartItem[] | OrderDetails[];
  export let totalPrice: number;
  export let listLabel = 'Order Details';
</script>

<div class="order-details-container">
  <h3>{ listLabel }</h3>
  <table>
    <tr>
      <th class="max-w-[30%]">Product</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Amount</th>
    </tr>

    {#each items as item}
      <tr>
        <td>{ toProduct(item) }</td>
        <td>{ item.quantity }</td>
        <td>{ item.offering.price }</td>
        <td>{ (item.quantity * item.offering.price).toFixed(2) }</td>
      </tr>
    {/each}
  </table>
  <p>Total: &#8369;{ totalPrice.toFixed(2) }</p>
</div>

<style lang="postcss">
  .order-details-container {
    @apply flex flex-col items-stretch justify-center font-IstokWeb w-full pr-10 py-4 border-r border-navy-blue;
  }

  .order-details-container > h3 {
    @apply text-start align-bottom text-5xl text-navy-blue w-full pb-6;
  }

  .order-details-container > p {
    @apply text-start align-bottom text-5xl text-navy-blue w-full pt-4 pb-2;
  }

  table {
    @apply grow w-full border-separate border-spacing-3 text-[#8E8E8E] text-2xl;
  }
</style>