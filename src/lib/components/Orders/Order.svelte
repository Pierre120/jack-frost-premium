<script lang="ts">
	import EditOrder from '$lib/components/Buttons/Edit.svelte';
	import { goto } from '$app/navigation';
	import type { Order } from '$lib/types/order';

	export let order: Order;

	let orderdetails = order?.order_details || [];

	const editOrder = () => {
		//NOT YET IMPLEMENTED!
		goto(`/admin/orders/${order?.id}`);
	};


</script>

<div class="order-item-container font-IstokWeb">
	<div class="flex justify-between items-center bg-white p-2">
		<div class="top-field">
			<p class="text-indigo-900 font-semibold text-2xl">Order #{order.number}</p>
			<p class="text-indigo-900">Status: {order?.payment_status}</p>
			<p class="text-indigo-900">Estimated Date: {order?.estimated_delivery}</p>
		</div>
		<div class="edit-button-specs">
			<EditOrder on:edit={editOrder} />
		</div>
	</div>
	<div class="flex-1 bg-white p-2 flex">
		<div class="w-1/3">
			<p class="heading">Receipt</p>
			<ul class="list-disc pl-4 mt-4">
				{#each orderdetails as orderDetail}
					<li>{orderDetail}</li>
				{/each}
			</ul>
		</div>
		<div class="w-1/3">
			<p class="heading">Customer Details</p>
			<ul class="text-indigo-900 mt-4 ">
				<li>Name: {order?.first_name} {order?.last_name}</li>
				<li>Contact Number: {order.primary_contact}</li>
				<li>Payment Method: {order.payment_mode}</li>
			</ul>
		</div>
		<div class="w-1/3">
			<p class="mt-4 italic">
				{order.additional_details}
			</p>
		</div>
	</div>
	<div class="flex justify-between items-center bg-white p-2">
		<div>
			<p class="amount">Total Amount: &#8369{order.total_price}</p>
			<p class="amount">Amount paid: &#8369{order.amount_paid}</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.order-item-container{
		@apply bg-gray-100 flex flex-col mt-10 shadow-xl ;
	}

	.top-field{
		@apply flex flex-row justify-between items-center gap-x-20 font-IstokWeb text-lg;
	}
	.edit-button-specs {
		@apply ml-4 bg-white text-white font-bold py-2 px-4 rounded ;
	}

	.heading{
		@apply text-indigo-900 font-semibold text-lg;
	}

	.amount{
		@apply text-indigo-900 
	}
</style>
