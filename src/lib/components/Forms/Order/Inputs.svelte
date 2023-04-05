<script lang="ts">
	import type { Order } from '$lib/types/order';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from './$types';

	const dispatch = createEventDispatcher();

	const closeForm = () => {
		dispatch('close');
	};

	export let form: ActionData;
	export let formaction: string;
	export let order: Order;
	export let isCheckout = false;
	export let formName = 'order-form';

	let additional_details = order?.additional_details ?? '';
</script>

<div class="input-section">
	<h3>Customer Details</h3>

	<div class="input-container">
		<div class="important-inputs">
			<label for="customer_name" class="input-label"> Name: </label>
			<input
				type="text"
				name="customer_name"
				id="customer_name"
				class={form?.errors?.customer_name ? 'border-primary-red' : 'border-navy-blue'}
				form={formName}
				value={order?.name ?? form?.data?.customer_name ?? ''}
			/>
			<label for="customer_name" class="input-error">
				{#if form?.errors?.customer_name}
					{form?.errors?.customer_name[0] ?? ''}
				{/if}
			</label>

			<label for="contact_number" class="input-label"> Contact Number: </label>
			<input
				type="text"
				name="contact_number"
				id="contact_number"
				class={form?.errors?.contact_number ? 'border-primary-red' : 'border-navy-blue'}
				form={formName}
				value={order?.primary_contact ?? form?.data?.contact_number ?? ''}
				pattern="(0|\+63)[0-9]{'{10}'}"
			/>
			<label for="contact_number" class="input-error">
				{#if form?.errors?.contact_number}
					{form?.errors?.contact_number[0] ?? ''}
				{/if}
			</label>

			<label for="payment_method" class="input-label"> Payment Method: </label>
			<select
				name="payment_method"
				id="payment_method"
				class={form?.errors?.payment_method ? 'border-primary-red' : 'border-navy-blue'}
				form={formName}
			>
				<option value="" disabled selected={!(form?.data?.payment_method || order?.payment_mode)}
					>Select payment method</option
				>
				<option
					value="GCASH"
					selected={form?.data?.payment_method === 'GCASH' || order?.payment_mode === 'GCASH'}
					>GCash</option
				>
				<option
					value="MAYA"
					selected={form?.data?.payment_method === 'MAYA' || order?.payment_mode === 'MAYA'}
					>Maya</option
				>
				<option
					value="BDO"
					selected={form?.data?.payment_method === 'BDO' || order?.payment_mode === 'BDO'}
					>BDO Bank Transfer</option
				>
			</select>
			<label for="payment_method" class="input-error">
				{#if form?.errors?.payment_method}
					{form?.errors?.payment_method[0] ?? ''}
				{/if}
			</label>
		</div>

		<div class="additional-input">
			<label for="additional_details" class="input-label"> Additional Details: </label>
			<textarea
				name="additional_details"
				id="additional_details"
				form={formName}
				class="grow"
				maxlength="256"
				bind:value={additional_details}
			/>
			<label for="additional_details" class="length">
				{additional_details.length} / 256
			</label>
		</div>
	</div>

	{#if isCheckout}
		<div class="buttons-container">
			<button class="checkout-btn" type="submit" form={formName} {formaction}>Checkout</button>
			<button class="cancel-btn" type="button" on:click={closeForm}>Cancel</button>
		</div>
	{/if}
</div>

<style lang="postcss">
	.input-section {
		@apply flex flex-col items-stretch justify-center font-IstokWeb w-full pl-14 py-4;
	}

	.input-section > h3 {
		@apply text-start align-bottom text-5xl text-navy-blue w-full pb-6;
		/* text-[#352F75] */
	}

	.input-container {
		@apply grid grid-cols-9 gap-10 justify-items-stretch content-center w-full pl-5 py-2;
	}

	.input-label {
		@apply text-start align-bottom text-3xl text-dark-blue w-full;
	}

	.input-error {
		@apply flex items-start justify-start text-start align-bottom text-sm text-primary-red 
      w-full h-10 px-1;
	}

	.length {
		@apply text-end align-middle text-sm text-modal-backdrop w-full h-10 px-1;
	}

	.important-inputs {
		@apply flex flex-col items-stretch justify-center w-full col-span-4;
	}

	.additional-input {
		@apply flex flex-col items-stretch justify-center w-full col-start-5 col-span-5;
	}

	.buttons-container {
		@apply flex items-end justify-end w-full pt-20 gap-20;
	}

	.buttons-container > button {
		@apply w-52 px-2 py-2 text-3xl text-white rounded-lg shadow-md cursor-pointer;
	}

	.checkout-btn {
		@apply bg-navy-blue hover:bg-dark-blue;
	}

	.cancel-btn {
		@apply bg-[#BEBEBE] hover:bg-primary-red;
	}

	input,
	textarea,
	select {
		@apply w-full px-4 py-2 mt-2 text-xl text-[#666666] bg-[#ECEBFA] border rounded-lg
      focus:bg-white focus:outline-none focus:ring-2 
      focus:ring-dark-blue focus:border-transparent placeholder:text-slate-400;
	}

	textarea {
		@apply resize-none overflow-y-scroll border-navy-blue;
	}
</style>
