<script lang="ts">
  import type { CartItem } from "$lib/types/cart";
  import type { OrderDetails } from "$lib/types/order";

  const toProduct = (item: CartItem | OrderDetails) => {
    switch(item.offering?.size_name.toLowerCase()) {
      case "pint":
        return item.product?.name + "-PNT";
      case "half-gallon":
        return item.product?.name + "-HG";
      case "half gallon":
        return item.product?.name + "-HG";
      case "gallon":
        return item.product?.name + "-GL";
      case "less sugar":
        return item.product?.name + "-LS";
      default:
        return item.product?.name;
    }
  };

  export let items: CartItem[] | OrderDetails[];
  export let totalPrice = 0;
  export let listLabel = 'Order Details';
</script>

<div class="order-details-container">
  <h3>{ listLabel }</h3>
  <div class="table-container">
    <table>
      <tr>
        <th class="th-w">Product</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Amount</th>
      </tr>
      {#each items as item}
        <tr>
          <td class="min-w-[20%] max-w-[20%]">{ toProduct(item) }</td>
          <td>{ item.quantity }</td>
          <td>{ item.offering?.price }</td>
          <td>{ (item.quantity * (item.offering?.price ?? 0)).toFixed(2) }</td>
        </tr>
      {/each}
    </table>
  </div>
  <p>Total: &#8369;{ totalPrice.toFixed(2) }</p>
</div>

<style lang="postcss">
  .order-details-container {
    @apply flex flex-col items-stretch justify-start font-IstokWeb w-full pr-10 py-4 border-r border-navy-blue;
  }

  .order-details-container > h3 {
    @apply text-start align-bottom text-5xl text-navy-blue w-full pb-6;
  }

  .order-details-container > p {
    @apply text-start align-bottom text-5xl text-navy-blue w-full pt-4 pb-2;
  }

  table {
    @apply w-full border-separate border-spacing-3 text-[#8E8E8E] text-2xl;
  }

  table th, table td {
    @apply text-start;
  }

  th {
    @apply sticky top-0 bg-white;
  }

  .table-container {
    @apply w-full max-h-[512px] overflow-y-auto mb-auto;
  }
</style>