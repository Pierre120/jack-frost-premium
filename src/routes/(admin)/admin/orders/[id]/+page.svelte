<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Order, OrderDetails } from '$lib/types/order';
	import type { SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';
	import EditOrderForm from '$lib/components/Forms/Order/Edit.svelte';
	import ConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import StatusModal from '$lib/components/Modal/Status.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	export let formData: ActionData;
	//export let order: Order;

	let formaction = '?/edit';
	let items = data.order.order_details as OrderDetails[];
	let totalPrice = data.order.total_price;
	let order = data.order;
	let label = '';
	let confirmationHeader = '';
	let confirmationDetails = '';
	let cancelLabel = '';
	let confirmLabel = '';
	let statusHeader = '';
	let statusInfo = '';
	let isAboutToLeave = false;
	let isAboutToDelete = false;
	let success = false;
	let deleted = false;
	let loading = false;

	const successEdit = async () => {
		success = true;
		deleted = false;
		statusHeader = 'CHANGES SAVED';
		statusInfo = 'The changes you made have been saved';
		// await invalidateAll();
	};

	const successDelete = async () => {
		success = false;
		deleted = true;
		isAboutToDelete = false;
		statusHeader = 'ORDER DELETED';
		statusInfo = 'The order has been deleted';
		// await invalidateAll();
		setTimeout(() => {
			goto('/admin/orders');
		}, 1500);
	};

	const discardChange = () => {
		confirmationHeader = 'DISCARD CHANGES?';
		confirmationDetails =
			"The changes you've made will not be saved if you leave this page without saving.";
		cancelLabel = 'Stay on this Page';
		confirmLabel = 'Leave this Page';
		isAboutToLeave = true;
	};

	const deleteOrder = () => {
		confirmationHeader = 'DELETE ORDER?';
		confirmationDetails = 'Are you sure you would like to delete this order?';
		cancelLabel = 'Cancel';
		confirmLabel = 'Delete Order';
		isAboutToDelete = true;
	};

	const cancel = () => {
		isAboutToLeave = false;
		isAboutToDelete = false;
	};

	const confirm = async () => {
		if (isAboutToLeave) {
			isAboutToLeave = false;
			goto('/admin/orders');
		}
		if (isAboutToDelete) {
			loading = true;
			statusHeader = 'FOR A MOMENT...';
			statusInfo = 'Deleting the order...';
			// Delete
			const result = await fetch(`/api/orders/${data.order.id}/delete`, {
				method: 'POST'
			});
			if ((await result.json()).success) {
				loading = false;
				await successDelete();
			}
		}
	};

	const submitEdit: SubmitFunction = async () => {
		loading = true;
		statusHeader = 'FOR A MOMENT...';
		statusInfo = 'Saving the changes...';
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					loading = false;
					await successEdit();
					break;
				case 'error':
					loading = false;
					success = false;
					break;
			}
			await update();
		};
	};
</script>

<svelte:head>
	<title>Edit Order | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="w-full min-h-screen bg-white flex items-start justify-center py-4">
	<!-- <h1 class="text-teal-600">Jack Frost Premium Ice Cream Order Page</h1>
	<p><code>// TODO: Implement Order page</code></p> -->
	<EditOrderForm
		handleSubmit={submitEdit}
		{formaction}
		{items}
		{totalPrice}
		{formData}
		{order}
		{label}
		on:close={discardChange}
		on:remove={deleteOrder}
	/>
</div>

{#if isAboutToLeave || isAboutToDelete}
	<ConfirmationModal
		{confirmationHeader}
		{confirmationDetails}
		{cancelLabel}
		{confirmLabel}
		on:cancel={cancel}
		on:confirm={confirm}
	/>
{/if}
{#if success || deleted || loading}
	<StatusModal {success} {deleted} {loading} {statusHeader} {statusInfo} />
{/if}
