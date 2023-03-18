<script lang="ts">
	import type { SubmitFunction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import AddCategoryForm from '$lib/components/Forms/Category.svelte';
	import LeaveConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import StatusModal from '$lib/components/Modal/Status.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const confirmationHeader = 'DISCARD CATEGORY?';
	const confirmationDetails =
		'The category you’ve made will not be saved if you leave this page without saving.';
	const cancelLabel = 'Stay on this Page';
	const confirmLabel = 'Leave this Page';
	let isAboutToLeave = false;
	let success = false;

	const successAdd = async () => {
		success = true;
		await invalidateAll();
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

	const submitAdd: SubmitFunction = async ({form}) => {
		console.log(form);
		console.log("In submit handle");
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					await successAdd();
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
submitHandle= {submitAdd}
category={data.categories} 
hasDeleteButton ={false}
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
{#if success}
	<StatusModal {success} statusHeader="Category Added" statusInfo="Successfully added category" />
{/if}
