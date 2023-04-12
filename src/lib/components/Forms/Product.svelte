<script lang="ts">
	import Spinner from '../Spinner.svelte';
	import TemplateForm from '$lib/components/Forms/Template.svelte';
	import SaveButton from '$lib/components/Buttons/Save.svelte';
	import DeleteButton from '$lib/components/Buttons/Delete.svelte';
	import tmpImg from '$lib/assets/images/tmp.png';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import type { Product } from '$lib/types/product';
	import { supabase } from '$lib/utils/supabase';
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';

	export let categories: { id: string; name: string }[];
	export let label: string;
	export let formaction: string;
	export let form: ActionData;
	export let submitHandle: SubmitFunction;
	export let hasSaveButton = false;
	export let hasDeleteButton = false;
	export let hasHeader = false;
	export let product: Product | null = null;

	let pname = product?.name ?? form?.data?.name ?? '';
	let description = product?.description ?? form?.data?.description ?? '';
	let imagePath = product?.img_path ?? form?.data?.img_path ?? '';
	let imageUrl = product?.img_src ?? form?.data?.img_src ?? tmpImg;
	let isUploading = false;
	let isRendering = false;

	const dispatch = createEventDispatcher();
	const remove = () => {
		dispatch('remove');
	};

	const autoExpand = (event) => {
		event.target.style.height = 'auto';
		let scrollheight = event.target.scrollHeight;
		event.target.style.height = scrollheight + 'px';
	};

	const closeForm = () => {
		// goto('/admin/products');
		dispatch('close');
	};

	const deleteImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('images').remove([path]);

			if (error) {
				throw error;
			}
			if (data) {
				console.log('File deleted successfully.');
				imageUrl = tmpImg;
				imagePath = '';
			}
		} catch (err) {
			if (err instanceof Error) {
				alert(err.message);
			}
		}
	};

	const getImage = async (path: string) => {
		try {
			const { data } = await supabase.storage.from('images').getPublicUrl(path);
			console.log('uploaded image: ' + JSON.stringify(data));

			if (data) {
				imageUrl = data.publicUrl;
				isRendering = true;
			}
		} catch (err) {
			if (err instanceof Error) {
				alert(err.message);
			}
		}
	};

	const uploadImage = async (event) => {
		try {
			isUploading = true;

			// Check if file input is empty
			if (!event.target.files || event.target.files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			if (imagePath && imagePath.split('/')[0] !== 'products') {
				await deleteImage(imagePath);
			}

			const file = event.target.files[0];
			imagePath = `${Date.now()}-${file.name}`;

			const { data, error } = await supabase.storage.from('images').upload(imagePath, file, {
				cacheControl: '3600',
				upsert: false
			});

			if (error) {
				throw error;
			}
			if (data) {
				console.log('File uploaded successfully.');
				getImage(imagePath);
			}
		} catch (err) {
			if (err instanceof Error) {
				alert(err.message);
			}
		} finally {
			isUploading = false;
		}
	};

	onDestroy(() => {
		if (imagePath && imagePath.split('/')[0] !== 'products') {
			deleteImage(imagePath);
		}
	});
</script>

<div class="product-form-container">
	<TemplateForm {label} {hasHeader} {hasSaveButton} {hasDeleteButton} on:close={closeForm}>
		<SaveButton slot="saveButton" form="product-form" {formaction} />
		<DeleteButton slot="deleteButton" on:remove={remove} />
		<form
			id="product-form"
			class="product-form"
			slot="body"
			method="POST"
			use:enhance={submitHandle}
		>
			<div class="info-1">
				<div class="product-name">
					<label for="name">Product Name:</label>
					<input
						type="text"
						name="name"
						id="name"
						class={form?.errors?.name ? 'border-primary-red' : 'border-[#352F75]'}
						placeholder="Enter product name"
						maxlength="32"
						bind:value={pname}
					/>
					<span class="length">{pname.length} / 32</span>
					<label for="name" class="input-error">
						{#if form?.errors?.name}
							{form?.errors?.name[0] ?? ''}
						{/if}
					</label>
				</div>
				<div class="product-desc">
					<label for="description">Product Description:</label>
					<textarea
						name="description"
						id="description"
						class={form?.errors?.description ? 'border-primary-red' : 'border-[#352F75]'}
						placeholder="Enter description"
						maxlength="256"
						bind:value={description}
						on:input={autoExpand}
						on:change={autoExpand}
					/>
					<span class="length">{description.length} / 256</span>
					<label for="description" class="input-error">
						{#if form?.errors?.description}
							{form?.errors?.description[0] ?? ''}
						{/if}
					</label>
				</div>
			</div>
			<div class="info-2">
				<div class="product-img">
					<span class="product-img-label">Product Image:</span>
					<div class="product-image">
						<div class="w-2/5 {isUploading || isRendering ? '' : 'hidden'}">
							<Spinner color="white" size="full" />
						</div>
						<img
							src={imageUrl}
							alt="Ice cream"
							class="{isUploading || isRendering ? 'hidden' : ''} {form?.errors?.img_path
								? 'border-2 border-primary-red'
								: 'border-[#352F75]'}"
							on:load={() => {
								isRendering = false;
							}}
						/>
						<input type="hidden" name="img_src" id="img_src" bind:value={imageUrl} />
						<!--! This is a hidden input -->
						<input type="hidden" name="img_path" id="img_path" bind:value={imagePath} />
						<!--! This is a hidden input -->
						<label
							for="image"
							class="image-upload-btn {isUploading || isRendering ? 'pointer-events-none' : ''}"
						>
							{#if isUploading}
								<!-- <Spinner color="white" size="14" /> -->
								<span>Uploading image...</span>
							{:else if isRendering}
								<span>Rendering image...</span>
							{:else}
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
									<!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
									<path
										d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
									/>
								</svg>
								<span>Upload an image</span>
								<!-- <span>{imageUrl}</span>
								<span>{imagePath}</span> -->
							{/if}
						</label>
					</div>
					<label for="img_path" class="input-error">
						{#if form?.errors?.img_path}
							{form?.errors?.img_path[0] ?? ''}
						{/if}
					</label>
				</div>
				<div class="product-category">
					<label for="category_id">Product Category:</label>
					<select
						name="category_id"
						id="category_id"
						class={form?.errors?.category_id ? 'border-primary-red' : 'border-[#352F75]'}
					>
						<option
							value=""
							class="text-gray-400"
							disabled
							selected={product?.category_id && form?.data?.category_id ? false : true}
							>Choose a category</option
						>
						{#each categories as category}
							<option
								value={category.id}
								selected={category.id == product?.category_id ||
									category.id == form?.data?.category_id}
								>{category.name}
							</option>
						{/each}
					</select>
					<label for="category_id" class="input-error">
						{#if form?.errors?.category_id}
							{form?.errors?.category_id[0] ?? ''}
						{/if}
					</label>
				</div>
			</div>
		</form>
	</TemplateForm>
	<input
		type="file"
		name="image"
		id="image"
		class="hidden"
		accept="image/png,image/jpeg,image/jpg"
		on:change={uploadImage}
		disabled={isUploading}
	/>
</div>

<style lang="postcss">
	.product-form-container {
		@apply flex flex-col items-center justify-start w-screen min-h-screen bg-white overflow-hidden overflow-y-auto;
	}

	.product-form {
		/* @apply flex items-stretch justify-center w-full; */
		@apply grid grid-cols-2 gap-14 justify-items-stretch w-full;
	}

	.info-1 {
		@apply flex flex-col items-center justify-start  pr-4;
	}

	.info-2 {
		@apply flex flex-col items-center justify-start  pl-4;
	}

	.product-name {
		@apply flex flex-col items-stretch justify-center w-full font-IstokWeb;
	}

	.product-name > label:not(.input-error) {
		@apply text-start align-bottom text-3xl text-[#352F75];
	}

	.product-name > input {
		@apply w-full px-4 py-2 mt-4 text-xl text-[#666666] bg-[#ECEBFA] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent;
	}

	.product-desc {
		@apply flex flex-col items-stretch justify-center w-full pt-10 font-IstokWeb;
	}

	.product-desc > label:not(.input-error) {
		@apply text-start align-bottom text-3xl text-[#352F75];
	}

	.product-desc > textarea {
		@apply resize-none overflow-hidden w-full min-h-[16rem] px-4 py-2 mt-4 text-xl text-[#666666] bg-[#ECEBFA] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent;
	}

	.length {
		@apply font-IstokWeb text-end align-bottom text-sm text-modal-backdrop;
	}

	.product-img {
		@apply flex flex-col items-stretch justify-center w-full font-IstokWeb;
	}

	.product-img-label {
		@apply text-start align-bottom text-3xl text-[#352F75];
	}

	.product-image {
		@apply flex items-end justify-start w-full mt-4;
	}

	.product-image > img {
		@apply /* w-2/5 */ w-96 /* h-full */ h-80 object-cover;
	}

	.product-image > input {
		@apply hidden;
	}

	.image-upload-btn {
		@apply flex items-center justify-center max-w-max px-6 py-2 ml-6 text-xl text-white bg-[#352F75] 
      border-2 border-[#352F75] hover:bg-white hover:text-[#352F75] rounded-lg cursor-pointer shadow-lg;
	}

	.image-upload-btn > svg {
		@apply w-14 h-14 mr-2 fill-current;
	}

	.image-upload-btn > span {
		@apply font-IstokWeb pl-4 pt-2;
	}

	.product-category {
		@apply flex flex-col items-stretch justify-center w-full pt-10 font-IstokWeb;
	}

	.product-category > label:not(.input-error) {
		@apply text-start align-bottom text-3xl text-[#352F75];
	}

	.product-category > select {
		@apply w-full px-4 py-2 mt-4 text-xl text-[#666666] bg-[#ECEBFA] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent;
	}

	.input-error {
		@apply flex items-start justify-start text-start align-bottom text-sm text-primary-red 
      w-full h-10 px-1;
	}
</style>
