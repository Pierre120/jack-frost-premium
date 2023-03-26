<script lang="ts">
import { goto } from '$app/navigation';
import OrderForm from '$lib/components/Forms/Order/index.svelte';
import type { Order } from '$lib/types/order';
import type { SubmitFunction } from '$app/forms';
import type { ActionData } from './$types';
import StatusModal from '$lib/components/Modal/Status.svelte';

export let data: PageData;

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
		statusHeader = 'PRODUCT DELETED';
		statusInfo = 'The product has been deleted';
		// await invalidateAll();
		setTimeout(() => {
			goto('/admin/products');
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

	const deleteProduct = () => {
		confirmationHeader = 'DELETE PRODUCT?';
		confirmationDetails = 'Are you sure you would like to delete this product?';
		cancelLabel = 'Cancel';
		confirmLabel = 'Delete Product';
		isAboutToDelete = true;
	};

	const cancel = () => {
		isAboutToLeave = false;
		isAboutToDelete = false;
	};

	const confirm = async () => {
		if (isAboutToLeave) {
			isAboutToLeave = false;
			goto('/admin/products');
		}
		if (isAboutToDelete) {
			loading = true;
			statusHeader = 'FOR A MOMENT...';
			statusInfo = 'Deleting the product...';
			// Delete
			const result = await fetch(`/api/products/${data.product.id}/delete`, {
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
					console.log(result.error);
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