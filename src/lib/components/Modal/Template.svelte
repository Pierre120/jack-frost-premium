<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	const closeModal = () => {
		dispatch('closeModal');
	};

	let isLoading = true;

	export let width: string;
	export let bgColor: string;
	export let hasCloseIcon = true;
	export let zIndex: 0 | 20 | 10 | 30 | 40 | 50 = 30;
</script>

<div class="modal-backdrop z-{zIndex}" transition:fade>
	<div
		class="modal-component {width} {bgColor}"
		on:load={() => {
			isLoading = false;
		}}
		transition:fly={{ y: 100, duration: 500 }}
	>
		{#if hasCloseIcon}
			<button class="modal-close" on:click={closeModal}>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" fill="none" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		{/if}
		<div class="modal-header">
			<slot name="header" />
		</div>
		<div class="modal-body">
			<slot name="body" />
		</div>
	</div>
</div>

<style lang="postcss">
	.modal-backdrop {
		@apply fixed top-0 left-0 right-0 w-full h-full px-1 pb-1 pt-[10vh] bg-modal-backdrop bg-opacity-60 flex justify-center items-start;
	}

	.modal-component {
		@apply flex flex-col rounded-3xl shadow-xl p-8 relative;
	}

	.modal-header {
		@apply flex flex-col items-stretch justify-center pb-6;
	}

	.modal-close {
		@apply absolute top-5 right-5 cursor-pointer;
	}

	.modal-close > svg {
		@apply stroke-close-icon;
	}

	.modal-close:hover > svg {
		@apply stroke-primary-red;
	}

	.modal-body {
		@apply flex flex-col items-center justify-center w-full min-w-min;
	}

	.product-info {
		@apply grid grid-cols-2 gap-x-6;
	}

	.product-info-image {
		@apply w-full h-full bg-no-repeat bg-cover rounded-3xl shadow-xl;
	}
</style>
