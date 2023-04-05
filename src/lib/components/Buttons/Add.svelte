<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let btnStyle = 'text-[#7A8BBB] hover:text-[#352F75]';
	export let iconSize = 'w-14 h-14';
	export let labelStyle = 'pl-3 text-3xl';
	export let label = 'Add';
	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';

	const dispatch = createEventDispatcher();
	const add = () => {
		dispatch('add');
	};
</script>

<button class="add-btn {btnStyle}" on:click={add} {type}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="icon {iconSize}"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
	<span class="label {labelStyle}">{label}</span>
</button>

<style lang="postcss">
	.add-btn {
		@apply flex items-center justify-center bg-transparent min-w-max max-w-max h-auto 
			cursor-pointer;
	}

	.icon {
		@apply stroke-1;
	}

	.label {
		@apply text-current font-IstokWeb align-bottom;
	}
</style>
