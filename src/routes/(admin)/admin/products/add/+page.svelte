<script lang="ts">
  import { goto } from '$app/navigation';
	import AddProductForm from '$lib/components/Forms/Product.svelte';
	import LeaveConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const confirmationHeader = 'DISCARD PRODUCT?';
	const confirmationDetails = 'The product you’ve made will not be saved if you leave this page without saving.'
	const cancelLabel = 'Stay on this Page';
	const confirmLabel = 'Leave this Page';
	let isAboutToLeave = false;

	const discardProduct = () => {
		isAboutToLeave = true;
	}

	const cancelDiscard = () => {
		isAboutToLeave = false;
	}

	const confirmDiscard = () => {
		// isAboutToLeave = false;
		goto('/admin/products', {invalidateAll: true});
	}
</script>

<AddProductForm label="Add Product" formaction="/api/products/add" categories={data.categories} on:close={discardProduct} />
{#if isAboutToLeave}
	<LeaveConfirmationModal {confirmationHeader} {confirmationDetails} {cancelLabel} {confirmLabel} on:cancel={cancelDiscard} on:confirm={confirmDiscard} />
{/if}
