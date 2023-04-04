<script lang="ts">
	import SaveButton from '$lib/components/Buttons/Save.svelte';
	import DeleteButton from '$lib/components/Buttons/Delete.svelte';
	import OrderDetailsList from '$lib/components/Forms/Order/EditDetails.svelte';
	import CustomerInputs from '$lib/components/Forms/Order/EditInputs.svelte';
	import TemplateForm from '$lib/components/Forms/Template.svelte';
	import type { Order, OrderDetails } from '$lib/types/order';
	import { createEventDispatcher } from 'svelte';
	import type { ActionData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';

	const dispatch = createEventDispatcher();

	function getDate(estimatedDelivery) {
		if (estimatedDelivery) {
			return new Date(estimatedDelivery).toISOString().substr(0, 10);
		} else {
			return '';
		}
	}

	const remove = () => {
		dispatch('remove');
	};

	const closeForm = () => {
		console.log('estimated delivery', order.estimated_delivery);
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
			<h3>Order Status</h3>
			<select name="payment_status" id="payment_status" form={formName} class={formData?.errors?.payment_status ? 'border-primary-red' : 'border-navy-blue'}>
				<option value="" disabled selected={!(formData?.data?.payment_status|| order?.payment_status)}
					>Select Order Status</option
				>
				<option value="NP" selected={orderStatus === 'NP'}>Unpaid</option>
				<option value="PP" selected={orderStatus === 'PP'}>Partially Paid</option>
				<option value="FP" selected={orderStatus === 'FP'}>Fully Paid</option>
				<option value="SS" selected={orderStatus === 'SS'}>Successful</option>
			</select>
			<label for="payment_status" class="input-error">
				<!-- { formData?.errors?.customer_name[0] ?? '' } -->
				<!-- Error Message! -->
				{#if formData?.errors?.payment_status}
					{formData?.errors?.payment_status[0] ?? ''}
				{/if}
			</label>
		</div>
		<SaveButton slot="saveButton" form={formName} {formaction} />
		<DeleteButton slot="deleteButton" on:remove={remove} />
		<form id={formName} class={formName} slot="body" method="POST" use:enhance={handleSubmit}>
			{#if !isCheckout}
				<div class="date-input-container">
					<h4>Estimated Delivery Date</h4>
					<input
						type="date"
						name="estimated_delivery"
						class={formData?.errors?.estimated_delivery ? 'border-primary-red' : 'border-navy-blue'}
						id="estimated_delivery"
						value={getDate(order?.estimated_delivery) || ''}
					/>
					<label for="estimated_delivery" class="input-error">
						<!-- { formData?.errors?.customer_name[0] ?? '' } -->
						<!-- Error Message! -->
						{#if formData?.errors?.estimated_delivery}
							{formData?.errors?.estimated_delivery[0] ?? ''}
						{/if}
					</label>
				</div>
			{/if}
			<div class="info-container">
				<div class="flex items-stretch justify-start w-full max-w-2xl flex flex-col">
					<OrderDetailsList {items} {totalPrice} />
					<div class="amount-paid">
						<label for="amount_paid" class="input-label"> Amount Paid: </label>
						<input
							type="text"
							name="amount_paid"
							id="amount_paid"
							form={formName}
							value={order?.amount_paid ?? ''}
						/>
						{formData}
						<label for="amount_paid" class="input-error">
							<!-- { formData?.errors?.customer_name[0] ?? '' } -->
							<!-- Error Message! -->
							{#if formData?.errors?.amount_paid}
								{formData?.errors?.amount_paid[0] ?? ''}
							{/if}
						</label>
					</div>
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

	.amount-paid {
		@apply mt-8 w-2/3 flex-row flex gap-x-8;
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

	.input-label {
		@apply text-start align-bottom text-3xl text-dark-blue w-full;
	}

	.input-error {
		@apply flex items-start justify-start text-start align-bottom text-sm text-primary-red 
      w-full h-10 px-1;
	}

	input {
		@apply w-full px-4 py-2 mt-2 text-xl text-[#666666] bg-[#ECEBFA] border border-navy-blue rounded-lg
      focus:bg-white focus:outline-none focus:ring-2 
      focus:ring-dark-blue focus:border-transparent placeholder:text-slate-400;
	}
</style>
