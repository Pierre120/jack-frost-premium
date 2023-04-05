<script lang="ts">
	import EditOrder from '$lib/components/Buttons/Edit.svelte';
	import { goto } from '$app/navigation';
	import type { Order, OrderDetails } from '$lib/types/order';

	export let order: Order;

	let orderdetails = order?.order_details || [];

	const editOrder = () => {
		//NOT YET IMPLEMENTED!
		goto(`/admin/orders/${order?.id}`);
	};

	const toProduct = (item: OrderDetails) => {
		switch (item.offering?.size_name.toLowerCase()) {
			case 'pint':
				return item.product?.name + '-PNT';
			case 'half-gallon':
				return item.product?.name + '-HG';
			case 'half gallon':
				return item.product?.name + '-HG';
			case 'gallon':
				return item.product?.name + '-GL';
			case 'less sugar':
				return item.product?.name + '-LS';
			default:
				return item.product?.name;
		}
	};
</script>

<div class="order-item-container font-IstokWeb">
	<div class="flex justify-between items-center bg-white p-2">
		<div class="top-field">
			<p class="text-indigo-900 font-semibold text-3xl">Order #{order.number}</p>
			<p class="text-indigo-900">Status: {order?.payment_status}</p>
			<p class="text-indigo-900">
				Estimated Date: {order.estimated_delivery
					? new Date(order.estimated_delivery).toLocaleDateString()
					: ''}
			</p>
		</div>
		<div class="edit-button-specs">
			<EditOrder on:edit={editOrder} />
		</div>
	</div>
	<div class="flex-1 bg-white p-2 flex">
		<div class="w-2/3">
			<p class="heading">Receipt</p>
			<div class="table-container">
				<table>
					<tr>
						<th class="">Product</th>
						<th>Qty</th>
						<th>Price</th>
						<th>Amount</th>
					</tr>
					{#each orderdetails as orderDetail}
						<tr>
							<td class="min-w-[20%] max-w-[20%]">{toProduct(orderDetail)}</td>
							<td>{orderDetail.quantity}</td>
							<td>{orderDetail.offering?.price}</td>
							<td>{(orderDetail.quantity * (orderDetail.offering?.price ?? 0)).toFixed(2)}</td>
						</tr>
					{/each}
				</table>
			</div>
		</div>
		<div class="w-3/5">
			<p class="heading">Customer Details</p>
			<ul class="text-indigo-900 mt-4 ">
				<li>Name: {order?.name}</li>
				<li>Contact Number: {order.primary_contact}</li>
				<li>Payment Method: {order.payment_mode}</li>
			</ul>
		</div>
		<div class="w-2/5">
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
	.order-item-container {
		@apply bg-gray-100 flex flex-col mt-10 shadow-xl;
	}

	.top-field {
		@apply flex flex-row justify-between items-center gap-x-20 font-IstokWeb text-lg;
	}
	.edit-button-specs {
		@apply ml-4 bg-white text-white font-bold py-2 px-4 rounded;
	}

	.heading {
		@apply text-indigo-900 font-semibold text-lg;
	}

	.amount {
		@apply text-indigo-900;
	}

	.table-container {
		@apply mr-4;
	}
</style>
