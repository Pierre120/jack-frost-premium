<script lang="ts">
	import Orders from '$lib/components/Orders/Order.svelte';
	import type { Order } from '$lib/types/order';
	import { createEventDispatcher } from 'svelte';

	export let width: string;
	export let orders: Order[];

	const dispatch = createEventDispatcher();
	const edit = (event: CustomEvent) => {
		dispatch('edit', event.detail);
	};
</script>

<div class="order-list-container {width}">
	<div class="order-list">
		{#each orders as order}
			<Orders {order} on:edit={edit} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.order-list-container {
		@apply flex flex-col min-w-min py-6;
	}

	.order-list {
		@apply w-full gap-y-16;
	}
</style>
