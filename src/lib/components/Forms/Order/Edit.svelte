<script lang="ts">
	import SaveButton from '$lib/components/Buttons/Save.svelte';
	import DeleteButton from '$lib/components/Buttons/Delete.svelte';
	import OrderDetailsList from '$lib/components/Forms/Order/Details.svelte';
	import CustomerInputs from '$lib/components/Forms/Order/Inputs.svelte';
	import TemplateForm from '$lib/components/Forms/Template.svelte';
	import type { Order, OrderDetails } from '$lib/types/order';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';

	const dispatch = createEventDispatcher();

	const remove = () => {
		dispatch('remove');
	};

	const closeForm = () => {
		dispatch('close');
	};

	export let handleSubmit: SubmitFunction;
	export let formaction: string;
	export let items: OrderDetails[];
	export let totalPrice: number;
	export let formData: ActionData;
	export let order: Order;
	export let hasSaveButton = true;
	export let hasDeleteButton = true;
	export let hasHeader = true;
	export let isCheckout = false;
	export let label = 'Order Status';

	let orderStatus = order?.payment_status ?? '';
	let formName = 'order-form';
</script>

<div class="order-form-container">
	<TemplateForm {label} {hasHeader} {hasSaveButton} {hasDeleteButton} on:close={closeForm}>
		<div slot="header" class="header-order">
			{#if order?.id}
				<h3>Order Status</h3>
				<select name="payment_status" id="payment_status" form={formName}>
					<option value="NP" selected={orderStatus === 'NP'}>Unpaid</option>
					<option value="PP" selected={orderStatus === 'PP'}>Partially Paid</option>
					<option value="FP" selected={orderStatus === 'FP'}>Fully Paid</option>
					<option value="SS" selected={orderStatus === 'SS'}>Successful</option>
				</select>
			{/if}
		</div>
		<SaveButton slot="saveButton" form={formName} {formaction} />
		<DeleteButton slot="deleteButton" on:remove={remove} />
		<form id={formName} class={formName} slot="body" method="POST" use:enhance={handleSubmit}>
			{#if !isCheckout}
				<div class="date-input-container">
					<h4>Estimated Delivery Date</h4>
					<input type="date" name="estimated_delivery" id="estimated_delivery" />
				</div>
			{/if}
			<div class="info-container">
				<div class="flex items-stretch justify-start w-full max-w-2xl">
					<OrderDetailsList {items} {totalPrice}/>
				</div>
				<CustomerInputs
					{formName}
					{formaction}
					{formData}
					{order}
					{isCheckout}
					on:close={closeForm}
				/>
			</div>
		</form>
	</TemplateForm>
</div>

<style lang="postcss">
	.order-form-container {
		@apply flex flex-col items-center justify-start w-full;
	}

	form {
		@apply flex flex-col items-stretch justify-start w-full;
	}

	.header-order {
		@apply flex items-center justify-start gap-x-40 font-IstokWeb;
	}

	.header-order > h3,
	.header-order h3 {
		@apply text-start align-bottom text-5xl text-navy-blue;
	}

	.date-input-container {
		@apply flex items-center justify-start gap-x-12 font-IstokWeb pb-10 -mt-5;
	}

	.date-input-container > h4,
	.date-input-container h4 {
		@apply text-start align-bottom text-4xl text-navy-blue;
	}

	select,
	input[type='date'] {
		@apply px-4 py-2 text-2xl text-[#666666] bg-[#ECEBFA]
      border border-navy-blue rounded-md
      focus:bg-white focus:outline-none focus:ring-2
      focus:ring-dark-blue focus:border-transparent placeholder:text-slate-400;
	}

	select {
		@apply w-72;
	}

	input[type='date'] {
		@apply w-64;
	}

	.info-container {
		@apply flex items-stretch justify-start w-full;
	}
</style>
