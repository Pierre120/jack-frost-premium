<script lang="ts">
	import { retrieveCart } from '$lib/stores/cart';
</script>

<svelte:head>
	<title>Order Success! | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="bg-white">
	<h1 class="text-teal-600">Jack Frost Premium Ice Cream Order Page</h1>
	<p><code>// TODO: Implement Order page</code></p>
</div>
<ul>
	{#each retrieveCart().items as item}
		<li>{item.product.name}</li>
	{/each}
</ul>
