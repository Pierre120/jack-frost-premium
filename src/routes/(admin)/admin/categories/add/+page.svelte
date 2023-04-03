<script lang="ts">
	import type { SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';
	import AddCategoryForm from '$lib/components/Forms/Category.svelte';
	import LeaveConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import StatusModal from '$lib/components/Modal/Status.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const confirmationHeader = 'DISCARD CATEGORY?';
	const confirmationDetails =
		'The category you’ve made will not be saved if you leave this page without saving.';
	const cancelLabel = 'Stay on this Page';
	const confirmLabel = 'Leave this Page';
	let statusHeader = '';
	let statusInfo = '';
	let isAboutToLeave = false;
	let success = false;
	let loading = false;

	const successAdd = async () => {
		success = true;
		statusHeader = 'CATEGORY SAVED';
		statusInfo = "The category you've made has been saved";
		// await invalidateAll();
	};

	const discardCategory = () => {
		isAboutToLeave = true;
	};

	const cancelDiscard = () => {
		isAboutToLeave = false;
	};

	const confirmDiscard = async () => {
		isAboutToLeave = false;
		goto('/admin/categories');
	};

	const submitAdd: SubmitFunction = async () => {
		loading = true;
		statusHeader = 'FOR A MOMENT...';
		statusInfo = 'Adding category...';
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					loading = false;
					await successAdd();
					break;
				case 'failure':
					loading = false;
					success = false;
					break;
				case 'error':
					console.log(result.error);
					break;
			}
			await update();
		};
	};
</script>

<AddCategoryForm
	label="Add Category"
	formaction="?/add"
	{form}
	submitHandle={submitAdd}
	category={data.categories}
	hasHeader={true}
	hasSaveButton={true}
	on:close={discardCategory}
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
