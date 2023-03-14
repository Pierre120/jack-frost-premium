<script lang="ts">
  import { goto, invalidateAll } from '$app/navigation';
	import AddProductForm from '$lib/components/Forms/Product.svelte';
	import LeaveConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import StatusModal from '$lib/components/Modal/Status.svelte'
	import type { PageData } from './$types';

	export let data: PageData;

	const confirmationHeader = 'DISCARD PRODUCT?';
	const confirmationDetails = 'The product you’ve made will not be saved if you leave this page without saving.'
	const cancelLabel = 'Stay on this Page';
	const confirmLabel = 'Leave this Page';
	let isAboutToLeave = false;
	let success = false;

	const successAdd = async () => {
		success = true;
		await invalidateAll();
		setTimeout(() => {
			goto('/admin/products');
		}, 1500);
	}

	const discardProduct = () => {
		isAboutToLeave = true;
	}

	const cancelDiscard = () => {
		isAboutToLeave = false;
	}

	const confirmDiscard = async () => {
		let timeout = 2000;
		isAboutToLeave = false;
		success = true;
		await invalidateAll();
		goto('/admin/products');
	}
</script>

<AddProductForm label="Add Product" formaction="/api/products/add" categories={data.categories} hasDeleteButton={false} on:close={discardProduct} />
{#if isAboutToLeave}
	<LeaveConfirmationModal {confirmationHeader} {confirmationDetails} {cancelLabel} {confirmLabel} on:cancel={cancelDiscard} on:confirm={confirmDiscard} />
{/if}
{#if success}
	<StatusModal {success} statusHeader="Product Added" statusInfo="Successfully added product" />
{/if}
