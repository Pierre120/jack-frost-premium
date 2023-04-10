<script lang="ts">
	import { goto } from '$app/navigation';
	import OrderForm from '$lib/components/Forms/Order/index.svelte';
	import ConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import StatusModal from '$lib/components/Modal/Status.svelte';
	import { retrieveCart, clearCart } from '$lib/stores/cart';
	import type { Order } from '$lib/types/order';
	import type { SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
	export let order: Order;

	let formaction = '?/order';
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

	let success = false;
	let loading = false;
	let warning = false;
	let statusHeader = '';
	let statusInfo = '';

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

	const submittingOrder = async () => {
		loading = true;
		statusHeader = 'FOR A MOMENT...';
		statusInfo = 'Submitting order...';
	};

	const successOrderSubmission = async () => {
		success = true;
		statusHeader = 'ORDER SUBMITTED';
		statusInfo = "The order you've made has been submitted";
	};

	const confirmOrder: SubmitFunction = ({ data, form }) => {
		submittingOrder();
		console.log(form);
		console.log(data);
		data.append('orderitems', JSON.stringify(items));
		data.append('totalprice', totalPrice.toString());
		return async ({ result, update }) => {
			// form.reset();
			switch (result.type) {
				case 'redirect':
					loading = false;
					successOrderSubmission();
					clearCart();
					await update();
					break;
				case 'failure':
					loading = false;
					success = false;
					await update();
					if(form?.dbFailed) {
						warning = true;
						statusHeader = 'ORDER NOT SUBMITTED';
						statusInfo = 'Order submission error. Please try again later.';
						setTimeout(() => {
							warning = false;
							statusHeader = '';
							statusInfo = '';
						}, 3000);
					}
					break;
			}
		};
	};
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
		{form}
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

{#if success || loading || warning}
	<StatusModal {success} {loading} {warning} {statusHeader} {statusInfo} />
{/if}
