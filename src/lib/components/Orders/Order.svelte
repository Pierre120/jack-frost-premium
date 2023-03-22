<script>
  import EditOrder from '$lib/components/Buttons/Edit.svelte';
  import { goto } from '$app/navigation';
  import type { Order } from '$lib/types/order';

  export let order: Order;

  const editOrder = () => {  //NOT YET IMPLEMENTED!
    goto(`/admin/orders/${order.id}`);
  };
</script>

<div class="bg-gray-100 flex flex-col">
  <div class="flex justify-between items-center bg-white p-4">
    <div>
      <p class="text-gray-700 font-semibold">Order #1234</p>
      <p class="text-gray-500">Status: Processing</p>
      <p class="text-gray-500">Estimated Date: 25 March 2023</p>
    </div>
    <div class="edit-button-specs">
      <EditOrder on:edit={editOrder} />
    </div>
  </div>
  <div class="flex-1 bg-gray-200 p-4 flex">
    <div class="w-1/3">
      <p class="text-gray-700 font-semibold">Receipt</p>
      <ul class="list-disc pl-4 mt-4">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
    <div class="w-1/3">
      <p class="text-gray-700 font-semibold">Customer Details</p>
      <ul class="list-disc pl-4 mt-4">
        <li>Name: John Doe</li>
        <li>Contact Number: (123) 456-7890</li>
        <li>Payment Method: john.doe@example.com</li>
      </ul>
    </div>
    <div class="w-1/3">
      <p class="text-gray-700 font-semibold">Customer Instructions</p>
      <p class="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac fermentum nibh, at lacinia ex. Sed nec diam vel orci sodales maximus.</p>
    </div>
  </div>
  <div class="flex justify-between items-center bg-white p-4">
    <div>
      <p class="text-gray-700 font-semibold">Total Amount: $100.00</p>
      <p class="text-gray-500">Amount paid: $0.00</p>
    </div>
  </div>
</div>


<style lang="postcss">
  	.edit-button-specs {
		@apply ml-4 bg-white text-white font-bold py-2 px-4 rounded;
	}
</style>