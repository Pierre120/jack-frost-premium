<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let btnStyle = '';
	export let label = 'Delete';
	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';

	let dispatch = createEventDispatcher();
	let remove = () => {
		dispatch('remove');
	};
</script>

<button class="delete-btn {btnStyle}" on:click={remove} {type}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="icon">
		<!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
		<path
			d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
		/>
	</svg>
	<span class="label">{label}</span>
</button>

<style lang="postcss">
	.delete-btn {
		@apply flex items-center justify-center bg-transparent min-w-max max-w-max h-auto 
    text-gray-800/[.8] hover:text-[#F6162E] cursor-pointer;
	}

	.icon {
		@apply w-8 h-8 fill-current stroke-1;
	}

	.label {
		@apply pl-2 text-current font-IstokWeb text-2xl align-bottom;
	}
</style>
