<script lang="ts">
	import type { SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';
	import AddProductForm from '$lib/components/Forms/Product.svelte';
	import LeaveConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import StatusModal from '$lib/components/Modal/Status.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const confirmationHeader = 'DISCARD PRODUCT?';
	const confirmationDetails =
		"The product you've made will not be saved if you leave this page without saving.";
	const cancelLabel = 'Stay on this Page';
	const confirmLabel = 'Leave this Page';
	let statusHeader = '';
	let statusInfo = '';
	let isAboutToLeave = false;
	let success = false;
	let loading = false;

	const successAdd = async () => {
		success = true;
		statusHeader = 'PRODUCT SAVED';
		statusInfo = "The product you've made has been saved";
		// await invalidateAll();
	};

	const discardProduct = () => {
		isAboutToLeave = true;
	};

	const cancelDiscard = () => {
		isAboutToLeave = false;
	};

	const confirmDiscard = async () => {
		isAboutToLeave = false;
		goto('/admin/products');
	};

	const submitAdd: SubmitFunction = async () => {
		loading = true;
		statusHeader = 'FOR A MOMENT...';
		statusInfo = 'Adding product...';
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					loading = false;
					await successAdd();
					break;
				case 'failure':
					loading = false;
					break;
				case 'error':
					console.log(result.error);
					break;
			}
			await update();
		};
	};
</script>

<AddProductForm
	label="Add Product"
	formaction="?/add"
	{form}
	submitHandle={submitAdd}
	categories={data.categories}
	hasHeader={true}
	hasSaveButton={true}
	on:close={discardProduct}
/>
{#if isAboutToLeave}
	<LeaveConfirmationModal
		{confirmationHeader}
		{confirmationDetails}
		{cancelLabel}
		{confirmLabel}
		on:cancel={cancelDiscard}
		on:confirm={confirmDiscard}
	/>
{/if}
{#if success || loading}
	<StatusModal {success} {loading} {statusHeader} {statusInfo} />
{/if}
