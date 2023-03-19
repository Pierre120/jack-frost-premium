<script lang="ts">
	import type { SubmitFunction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import EditCategoryForm from '$lib/components/Forms/Category.svelte';
	import ConfirmationModal from '$lib/components/Modal/Confirmation.svelte';
	import StatusModal from '$lib/components/Modal/Status.svelte';
	import type { PageData } from './$types';

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

	const successEdit = async () => {
		success = true;
		deleted = false;
		statusHeader = 'CHANGES SAVED';
		statusInfo = 'The changes you made have been saved';
		await invalidateAll();
	};

	const successDelete = async () => {
		success = false;
		deleted = true;
		isAboutToDelete = false;
		statusHeader = 'CATEGORY DELETED';
		statusInfo = 'The category has been deleted';
		await invalidateAll();
		setTimeout(() => {
			goto('/admin/categories');
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

	const deleteCategory = () => {
		confirmationHeader = 'DELETE CATEGORY?';
		confirmationDetails = 'Are you sure you would like to delete this category?';
		cancelLabel = 'Cancel';
		confirmLabel = 'Delete Category';
		isAboutToDelete = true;
	};

	const cancel = () => {
		isAboutToLeave = false;
		isAboutToDelete = false;
	};

	const confirm = async () => {
		if (isAboutToLeave) {
			isAboutToLeave = false;
			goto('/admin/categories');
		}
		if (isAboutToDelete) {
			// Delete
			const result = await fetch(`/api/categories/${data.category.id}/delete`, {
				method: 'POST'
			});
			if ((await result.json()).success) {
				await successDelete();
			}
		}
	};

	const submitEdit: SubmitFunction = async () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
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

<EditCategoryForm
	label="Edit Category"
	formaction="?/edit"
	submitHandle={submitEdit}
	category={data.category}
	on:close={discardChange}
	on:remove={deleteCategory}
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
{#if success || deleted}
	<StatusModal {success} {deleted} {statusHeader} {statusInfo} />
{/if}
