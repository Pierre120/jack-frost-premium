<script lang="ts">
	import { goto } from '$app/navigation';
	import OrderForm from '$lib/components/Forms/Order/index.svelte';
	import ConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import { retrieveCart } from '$lib/stores/cart';
	import type { Cart } from '$lib/types/cart';
	import type { Order } from '$lib/types/order';
	import type { SubmitFunction } from '$app/forms';
	import { get, writable } from 'svelte/store';
	import type { ActionData } from './$types';

	export let formData: ActionData;
	export let order: Order;

	// const CartStore = writable<Cart>(retrieveCart());
	let formaction = '?/order';
	// let cart = get(CartStore);
	let cart = retrieveCart();
	let items = cart.items;
	let totalPrice = cart.total;
	let isCheckout = true;
	let label = '';

	let isAboutToCancel = false;
	let confirmationHeader = 'Cancel Order?';
	let confirmationDetails = "The order you've made will not be saved if you choose to cancel.";
	let cancelLabel = 'Stay on this Page';
	let confirmLabel = 'Cancel Order';

	const cancelOrderConfirmation = () => {
		isAboutToCancel = true;
	};

	const cancel = () => {
		isAboutToCancel = false;
	};

	const confirm = () => {
		if (isAboutToCancel) {
			isAboutToCancel = false;
			goto('/');
		}
	};

	const confirmOrder: SubmitFunction = ({ data, form }) => {
		console.log(form);
		console.log(data);
		data.append('orderitems', JSON.stringify(items));
		data.append('totalprice', totalPrice.toString());
		return async ({ result, update }) => {
			form.reset();
			switch (result.type) {
				case 'redirect':
					break;
			}
			await update();
		};
	};

	$: console.log(formData?.data.id ?? 'No data');
</script>

<svelte:head>
	<title>Order Confirmation | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="w-full min-h-screen bg-white flex items-start justify-center py-4">
	<!-- <h1 class="text-teal-600">Jack Frost Premium Ice Cream Order Page</h1>
	<p><code>// TODO: Implement Order page</code></p> -->
	<OrderForm
		{formaction}
		{items}
		{totalPrice}
		{isCheckout}
		{label}
		{formData}
		{order}
		handleSubmit={confirmOrder}
		on:close={cancelOrderConfirmation}
	/>
</div>

{#if isAboutToCancel}
	<ConfirmationModal
		{confirmationHeader}
		{confirmationDetails}
		{cancelLabel}
		{confirmLabel}
		on:cancel={cancel}
		on:confirm={confirm}
	/>
{/if}
