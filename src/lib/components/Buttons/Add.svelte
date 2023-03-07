<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let style = '';
	export let label = 'Add';

	const dispatch = createEventDispatcher();
	const add = () => {
		dispatch('add');
	};
</script>

<button class="add-btn {style}" on:click={add}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="icon"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
		/>
	</svg>
	<span class="label">{label}</span>
</button>

<style lang="postcss">
	.add-btn {
		@apply flex items-center justify-center bg-transparent min-w-max max-w-max h-auto 
      text-[#7A8BBB] hover:text-[#352F75] cursor-pointer;
	}

	.icon {
		@apply w-14 h-14 stroke-[#7A8BBB] stroke-1;
	}

	.label {
		@apply pl-3 text-[#7A8BBB] font-IstokWeb text-3xl align-bottom;
	}

	.add-btn:hover .label {
		@apply text-[#352F75];
	}

	.add-btn:hover .icon {
		@apply stroke-[#352F75];
	}
</style>
