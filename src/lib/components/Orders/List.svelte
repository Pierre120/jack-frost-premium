<script lang="ts">
	import Orders from '$lib/components/Orders/Order.svelte';
	import type { Order } from '$lib/types/order';

	export let width: string;
	export let orders: Order[];
	let number = 0;
</script>

<div class="order-list-container {width}">
	<div class="order-list">
		{#each orders as order}
			<Orders {number} {order}/>
			{(number += 1)}
		{/each}
	</div>
</div>

<style lang="postcss">
	.order-list-container {
		@apply flex flex-col min-w-min py-6 mt-10;
	}

	.order-list {
		@apply w-full gap-y-16;
	}
</style>
