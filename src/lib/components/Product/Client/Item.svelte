<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const showItem = () => {
		dispatch('click', { productId });
	};

	export let name: string;
	export let image: string;
	export let productId: string;
</script>

<div class="item-container">
	<button class="item-image" on:click={showItem}>
		<img src={image} alt={name} />
	</button>
	<div class="item-name">
		<button on:click={showItem}>{name}</button>
	</div>
</div>

<style lang="postcss">
	.item-container {
		@apply flex flex-col min-w-min w-full;
	}

	.item-image {
		@apply w-full rounded-3xl shadow-md hover:shadow-xl cursor-pointer;
	}

	.item-image > img {
		@apply w-full object-cover rounded-3xl;
	}

	.item-name {
		@apply w-full min-w-min font-Itim text-4xl flex justify-center;
	}

	.item-name > button {
		@apply p-4 text-center text-navy-blue hover:text-dark-navy-blue cursor-pointer;
	}
</style>
