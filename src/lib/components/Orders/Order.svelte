<script lang="ts">
	import EditOrder from '$lib/components/Buttons/Edit.svelte';
	import { goto } from '$app/navigation';
	import type { Order } from '$lib/types/order';

	export let order: Order;
	export let number = 0;

	let orderdetails = order?.order_details || [];

	const editOrder = () => {
		//NOT YET IMPLEMENTED!
		goto(`/admin/orders/${order?.id}`);
	};


</script>

<div class="bg-gray-100 flex flex-col">
	<div class="flex justify-between items-center bg-white p-4">
		<div>
			<p class="text-gray-700 font-semibold">Order #{number}</p>
			<p class="text-gray-500">Status: {order?.payment_status}</p>
			<p class="text-gray-500">Estimated Date: {order?.estimated_delivery}</p>
		</div>
		<div class="edit-button-specs">
			<EditOrder on:edit={editOrder} />
		</div>
	</div>
	<div class="flex-1 bg-gray-200 p-4 flex">
		<div class="w-1/3">
			<p class="text-gray-700 font-semibold">Receipt</p>
			<ul class="list-disc pl-4 mt-4">
				{#each orderdetails as orderDetail}
					<li>{orderDetail}</li>
				{/each}
			</ul>
		</div>
		<div class="w-1/3">
			<p class="text-gray-700 font-semibold">Customer Details</p>
			<ul class="list-disc pl-4 mt-4">
				<li>Name: {order?.first_name} {order?.last_name}</li>
				<li>Contact Number: {order.primary_contact}</li>
				<li>Payment Method: {order.payment_mode}</li>
			</ul>
		</div>
		<div class="w-1/3">
			<p class="text-gray-700 font-semibold">Customer Instructions</p>
			<p class="mt-4">
				{order.additional_details}
			</p>
		</div>
	</div>
	<div class="flex justify-between items-center bg-white p-4">
		<div>
			<p class="text-gray-700 font-semibold">Total Amount: {order.total_price}</p>
			<p class="text-gray-500">Amount paid: {order.amount_paid}</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.edit-button-specs {
		@apply ml-4 bg-white text-white font-bold py-2 px-4 rounded;
	}
</style>
