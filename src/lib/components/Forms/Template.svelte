<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let hasDeleteButton = false;

	const dispatch = createEventDispatcher();
	const closeForm = () => {
		dispatch('close');
	};
</script>

<div class="form-container">
	<div class="header">
		<h2>{label}</h2>
		<div class="buttons">
			<slot name="saveButton" />
			{#if hasDeleteButton}
				<slot name="deleteButton" />
			{/if}
		</div>
		<button class="close" on:click={closeForm}>X</button>
	</div>
	<div class="body">
		<slot name="body" />
	</div>
</div>

<style lang="postcss">
	.form-container {
		@apply block w-full min-h-screen px-32 bg-white;
	}

	.header {
		@apply flex items-center justify-between w-full py-10 relative;
	}

	.header > h2 {
		@apply font-IstokWeb font-bold text-start align-bottom uppercase text-4xl text-[#352F75];
	}

	.header > .buttons {
		@apply flex items-center justify-end gap-x-8;
	}

	.close {
		@apply absolute top-10 -right-16 p-0 text-4xl font-bold text-[#A2BCDD] hover:text-[#F6162E] cursor-pointer;
	}

	.body {
		@apply flex flex-col items-center justify-center w-full py-2;
	}
</style>
