<script lang="ts">
	import TemplateForm from '$lib/components/Forms/Template.svelte';
	import SaveButton from '$lib/components/Buttons/Save.svelte';
	import DeleteButton from '$lib/components/Buttons/Delete.svelte';
	import type { Category } from '$lib/types/category';
	import {createEventDispatcher} from 'svelte';
	import RemoveButton from '$lib/components/Buttons/Remove.svelte';
	import AddButton from '$lib/components/Buttons/Add.svelte';
	import { enhance, type SubmitFunction } from '$app/forms';
	import {goto} from '$app/navigation';
	
	export let label: string;
	export let formaction: string;
	export let hasDeleteButton = true;
	export let submitHandle: SubmitFunction;
	export let category: Category | null = null;

	const dispatch = createEventDispatcher();
	const remove = () => {
		dispatch('remove');
	};

	const closeForm = () => {
		dispatch('close')
	};

	let sizes = [{ sizeName: '', sizePrice: '' }]; // initial size input

	const addSize = () => {
		sizes = [...sizes, { sizeName: '', sizePrice: '' }];
	};

	const removeSize = () => {
		if (sizes.length > 1) {
			sizes = sizes.slice(0, sizes.length - 1);
		}
	};
</script>

<TemplateForm {label} {hasDeleteButton} on:close={closeForm}>
	<SaveButton slot="saveButton" form="category-form" {formaction} />
	<DeleteButton slot="deleteButton" on:remove={remove} />
	<form id="cagtegory-form" class="category-form" slot="body" method="POST" use:enhance={submitHandle}>
		<div class="info-1">
			<div class="category-name">
				<label for="name">Category Name:</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Enter category name"
					value={category?.name ?? ''}
				/>
			</div>
			<div class="button-container" />
		</div>
		<div class="info-2">
			<div class="size-input-container">
				<div class="size-input1 category-name">
					<label for="size-name">Size Name:</label>
					{#each sizes as size, i}
						<input
							type="text"
							name="size-name{i}"
							id="size-name{i}"
							placeholder="Size name {i + 1}"
							bind:value={size.sizeName}
						/>
					{/each}
				</div>
				<div class="size-input2 category-name">
					<label for="size-price">Size Price:</label>
					{#each sizes as size, i}
						<input
							type="text"
							name="size-price{i}"
							id="size-price{i}"
							placeholder=" &#8369;0"
							bind:value={size.sizePrice}
						/>
					{/each}
				</div>
				<div class="button-container">
					<div class="move-left">
						<AddButton on:add={addSize} />
					</div>
					<RemoveButton on:remove={removeSize} />
				</div>
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

	.category-name > label {
		@apply text-start align-bottom text-3xl text-[#352F75];
	}

	.category-name > input {
		@apply w-full px-4 py-2 mt-4 text-xl text-[#666666] bg-[#ECEBFA] border-2 border-[#352F75] rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent;
	}

	.size-input1 {
		@apply mr-4 mb-28;
	}

	.size-input2 {
		@apply mb-28;
	}

	.button-container {
		@apply flex flex-col absolute bottom-0 items-center justify-start;
	}

	.size-input-container {
		@apply flex flex-row relative;
	}

	.move-left {
		@apply mr-6;
	}
</style>
