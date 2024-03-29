<script lang="ts">
	import TemplateForm from '$lib/components/Forms/Template.svelte';
	import SaveButton from '$lib/components/Buttons/Save.svelte';
	import DeleteButton from '$lib/components/Buttons/Delete.svelte';
	import type { Category } from '$lib/types/category';
	import { createEventDispatcher } from 'svelte';
	import RemoveButton from '$lib/components/Buttons/Remove.svelte';
	import AddButton from '$lib/components/Buttons/Add.svelte';
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';
	//import Offering from '../Product/Offering.svelte';

	export let label: string;
	export let formaction: string;
	export let form: ActionData;
	export let hasSaveButton = false;
	export let hasDeleteButton = false;
	export let hasHeader = false;
	export let submitHandle: SubmitFunction;
	export let category: Category | null = null;

	const dispatch = createEventDispatcher();
	const remove = () => {
		dispatch('remove');
	};

	const closeForm = () => {
		dispatch('close');
	};

	//let offerings = [{ size_name: '', price: '' }]; // initial size input

	let sizes = category?.offerings ??
		form?.data?.offerings ?? [{ id: '', size_name: '', price: '' }];

	const addSize = () => {
		sizes = [...sizes, { id: '', size_name: '', price: '' }];
	};

	const removeSize = () => {
		if (sizes.length > 1) {
			sizes = sizes.slice(0, sizes.length - 1);
		}
	};
</script>

<TemplateForm {label} {hasHeader} {hasSaveButton} {hasDeleteButton} on:close={closeForm}>
	<SaveButton slot="saveButton" form="category-form" {formaction} />
	<DeleteButton slot="deleteButton" on:remove={remove} />
	<form
		id="category-form"
		class="category-form"
		slot="body"
		method="POST"
		use:enhance={submitHandle}
	>
		<div class="info-1">
			<div class="category-name">
				<label for="name">Category Name:</label>
				<input
					type="text"
					name="name"
					id="name"
					class={form?.errors?.name ? 'border-primary-red' : 'border-[#352F75]'}
					placeholder="Enter category name"
					value={category?.name ?? form?.data?.name ?? ''}
				/>
				<label for="description" class="input-error pl-1">
					{#if form?.errors?.name}
						{form?.errors?.name[0] ?? ''}
					{/if}
				</label>
			</div>
			<div class="button-container" />
		</div>
		<div class="info-2">
			<div class="size-input-container">
				<div class="size-input1 category-name">
					<label for="size-name">Size Name:</label>
					{#each sizes as size, i}
						<input type="hidden" name="offering_id{i}" id="offering-id{i}" bind:value={size.id} />
						<input
							type="text"
							name="size_name{i}"
							id="size-name{i}"
							class={form?.errors?.offerings && size.size_name === ''
								? 'border-primary-red'
								: 'border-[#352F75]'}
							placeholder="Size name {i + 1}"
							bind:value={size.size_name}
						/>
					{/each}
				</div>
				<div class="size-input2 category-name">
					<label for="size-price">Size Price:</label>
					{#each sizes as size, i}
						<input
							type="number"
							min="0"
							name="price{i}"
							id="size-price{i}"
							class={form?.errors?.offerings && (size.price === '' || size.price === 0)
								? 'border-primary-red'
								: 'border-[#352F75]'}
							placeholder=" &#8369;0"
							bind:value={size.price}
						/>
					{/each}
				</div>
			</div>
			<label for="size-price" class="input-error pl-36">
				{#if form?.errors?.offerings}
					{form?.errors?.offerings[0] ?? ''}
				{/if}
			</label>
			<div class="button-container">
				<div class="move-left">
					<AddButton on:add={addSize} />
				</div>
				<RemoveButton on:remove={removeSize} />
			</div>
		</div>
	</form>
</TemplateForm>

<style lang="postcss">
	.category-form {
		@apply grid grid-cols-2 justify-items-stretch w-full;
	}

	.info-1 {
		@apply flex flex-col items-center justify-start mr-16;
	}
	.info-2 {
		@apply flex flex-col items-center justify-start;
	}

	.category-name {
		@apply flex flex-col items-stretch justify-center w-full font-IstokWeb;
	}

	.category-name > label:not(.input-error) {
		@apply text-start align-bottom text-3xl text-[#352F75];
	}

	.category-name > input {
		@apply w-full px-4 py-2 mt-4 text-xl text-[#666666] bg-[#ECEBFA] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent;
	}

	.size-input1 {
		@apply mr-4;
	}

	.button-container {
		@apply flex flex-col items-center justify-start self-start pl-32;
	}

	.size-input-container {
		@apply flex flex-row relative;
	}

	.move-left {
		@apply mr-6;
	}

	.input-error {
		@apply flex items-start justify-start text-start align-bottom text-sm text-primary-red 
      w-full h-10 pr-1 pt-2 pb-6;
	}
</style>
