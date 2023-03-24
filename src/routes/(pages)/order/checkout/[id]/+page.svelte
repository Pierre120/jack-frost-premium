<script lang="ts">
	import { retrieveCart } from '$lib/stores/cart';
</script>

<svelte:head>
	<title>Order Checkout | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="w-full min-h-screen bg-white flex items-start justify-center py-4">
	<h1 class="text-teal-600">Jack Frost Premium Ice Cream Order Page</h1>
	<p><code>// TODO: Implement Order page</code></p>
</div>
<ul>
	{#each retrieveCart().items as item}
		<li>{item.product.name}</li>
	{/each}
</ul>
