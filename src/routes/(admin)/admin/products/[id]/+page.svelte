<script lang="ts">
	import type { SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';
	import EditProductForm from '$lib/components/Forms/Product.svelte';
	import ConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import StatusModal from '$lib/components/Modal/Status.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

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
	let warning = false;

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
					await update();
					break;
				case 'failure':
					loading = false;
					await update();
					if (form?.dbFailed) {
						warning = true;
						statusHeader = 'CHANGES NOT SAVED';
						statusInfo = 'Product name already exists!';
						setTimeout(() => {
							warning = false;
							statusHeader = '';
							statusInfo = '';
						}, 3000);
					}
					break;
				case 'error':
					console.log(result.error);
					await update();
					break;
			}
		};
	};
</script>

<svelte:head>
	<title>{data.product.name} | Jack Frost Premium Ice Cream</title>
</svelte:head>

<EditProductForm
	label="Edit Product"
	{form}
	submitHandle={submitEdit}
	formaction="?/edit"
	categories={data.categories}
	product={data.product}
	hasHeader={true}
	hasSaveButton={true}
	hasDeleteButton={true}
	on:close={discardChange}
	on:remove={deleteProduct}
/>
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
{#if success || deleted || loading || warning}
	<StatusModal {success} {deleted} {loading} {warning} {statusHeader} {statusInfo} />
{/if}
