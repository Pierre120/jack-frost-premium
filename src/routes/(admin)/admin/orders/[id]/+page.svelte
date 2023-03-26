<script lang="ts">
import { goto } from '$app/navigation';
import OrderForm from '$lib/components/Forms/Order/index.svelte';
import type { Order } from '$lib/types/order';
import type { SubmitFunction } from '$app/forms';
import type { ActionData } from './$types';
</script>

<svelte:head>
	<title>Edit Order | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="w-full min-h-screen bg-white flex items-start justify-center py-4">
	<!-- <h1 class="text-teal-600">Jack Frost Premium Ice Cream Order Page</h1>
	<p><code>// TODO: Implement Order page</code></p> -->
	<OrderForm
		{formaction}
		{items}
		{totalPrice}
		{isCheckout}
		{label}
		{formData}
		{order}
		handleSubmit={confirmOrder}
		on:close={cancelOrderConfirmation}
	/>
</div>