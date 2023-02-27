<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from '../../../routes/$types';

	export let data: LayoutData;
</script>

<div class="flex justify-center w-100">
	<ul class="navlinks">
		{#each data.pages as nav}
			<li><a href={nav.href} class:active={$page.url.pathname === nav.href}>{nav.title}</a></li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.navlinks {
		@apply flex justify-between min-w-min min-h-min w-3/5 list-none;
	}

	.navlinks > li {
		@apply p-2 align-text-bottom;
	}

	.navlinks > li > a {
		@apply uppercase font-bold font-IstokWeb align-text-bottom text-xl text-navy-blue hover:text-primary-red hover:border-b-2 hover:border-primary-red;
	}

	.active {
		@apply text-primary-red !important;
		@apply border-b-2 border-primary-red !important;
	}
</style>
