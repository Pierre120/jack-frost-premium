<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import OrderList from '$lib/components/Orders/List.svelte';

	export let data: PageData;

	const editOrder = (event: CustomEvent) => {
		goto(`/admin/orders/${event.detail.order_id}`);
	};

	const filterOrders = (paidStatus) => {
		let filteredOrders;
		if (paidStatus === 'unpaid') {
			filteredOrders = data.orders.filter(({ payment_status }) => payment_status === 'NP');
		} else if (paidStatus === 'partially_paid') {
			filteredOrders = data.orders.filter(({ payment_status }) => payment_status === 'PP');
		} else if (paidStatus === 'fully_paid') {
			filteredOrders = data.orders.filter(({ payment_status }) => payment_status === 'FP');
		} else if (paidStatus === 'successful') {
			filteredOrders = data.orders.filter(({ payment_status }) => payment_status === 'SS');
		} else {
			filteredOrders = data.orders;
		}
		// update the OrderList component with the filtered orders
		filteredOrdersStore.set(filteredOrders);
	};

	const filteredOrdersStore = writable(data.orders); // initialize store with all orders
	const filteredOrders = filteredOrdersStore; // create a store alias to use in the template
</script>

<svelte:head>
	<title>Orders | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="flex flex-col md:flex-row h-screen bg-indigo-200">
	<div class="bg-gray-200 md:w-1/4 option-container bg-indigo-200">
		<h2 class="title">Show:</h2>
		<div class="links">
			<!-- <a href="#" on:click={() => filterOrders('all')}><span class="color-square" />All</a>
			<a href="#" on:click={() => filterOrders('unpaid')}
				><span class="color-square unpaid" />Unpaid</a
			>
			<a href="#" on:click={() => filterOrders('partially_paid')}
				><span class="color-square partially-paid" />Partially Paid</a
			>
			<a href="#" on:click={() => filterOrders('fully_paid')}
				><span class="color-square fully-paid" />Fully Paid</a
			>
			<a href="#" on:click={() => filterOrders('successful')}
				><span class="color-square successful" />Successful</a
			> -->
			<button type="button" on:click={() => filterOrders('all')}><span class="color-square" />All</button>
			<button type="button" on:click={() => filterOrders('unpaid')}
				><span class="color-square unpaid" />Unpaid</button
			>
			<button type="button" on:click={() => filterOrders('partially_paid')}
				><span class="color-square partially-paid" />Partially Paid</button
			>
			<button type="button" on:click={() => filterOrders('fully_paid')}
				><span class="color-square fully-paid" />Fully Paid</button
			>
			<button type="button" on:click={() => filterOrders('successful')}
				><span class="color-square successful" />Successful</button
			>
		</div>
	</div>
	<div class="bg-gray-400 md:w-3/4 right-col">
		<OrderList width="w-full md:max-w-[90%]" orders={$filteredOrders} on:edit={editOrder} />
	</div>
</div>

<style lang="postcss">
	.title {
		@apply text-2xl font-bold font-IstokWeb text-indigo-800;
	}
	.option-container {
		@apply flex flex-col justify-start ml-12 gap-y-4 h-full w-1/4 mt-6;
	}
	.links {
		@apply text-xl font-IstokWeb flex flex-col items-start justify-start gap-y-4;
	}

	/* .links > a {
		@apply text-indigo-900 hover:underline hover:text-indigo-900;
	} */

	.links > button {
		@apply text-start text-indigo-900 hover:underline hover:text-indigo-900;
	}

	.right-col {
		@apply ml-auto pl-6 overflow-auto h-full bg-indigo-200;
	}

	.color-square {
		display: inline-block;
		width: 10px;
		height: 10px;
		margin-right: 10px;
		border-radius: 50%;
	}

	.unpaid {
		background-color: red;
	}

	.partially-paid {
		background-color: orange;
	}

	.fully-paid {
		background-color: yellow;
	}

	.successful {
		background-color: green;
	}
</style>
