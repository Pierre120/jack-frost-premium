<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from '../../../routes/$types';

	export let data: LayoutData;
</script>

<div class="flex justify-center w-2/3">
	<ul class="navlinks">
		{#each data.pages as nav}
			<li><a href={nav.href} class:active={$page.url.pathname === nav.href}>{nav.title}</a></li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.navlinks {
		@apply flex flex-wrap justify-between min-w-min min-h-min w-4/5 list-none;
	}

	.navlinks > li {
		@apply p-2 align-text-bottom;
	}

	.navlinks > li > a {
		@apply uppercase font-bold font-IstokWeb align-text-bottom text-navy-blue hover:text-primary-red hover:border-b-2 hover:border-primary-red block mt-4 ml-4 text-xl lg:inline-block lg:inline;
	}

	.active {
		@apply text-primary-red !important;
		@apply border-b-2 border-primary-red !important;
	}
	@media (max-width: 740px) {
		.navlinks {
			@apply flex-col justify-center w-auto mr-40;
		}

		.navlinks > li {
			@apply py-0;
		}

		.navlinks > li:first-child {
			border-top: none;
		}

		.navlinks > li > a {
			@apply text-sm;
		}
	}
	@media (max-width: 845px) {
		.navlinks > li > a {
			@apply text-sm;
		}
	}

	@media (max-width: 1048px) {
		.navlinks {
			@apply justify-center w-auto;
		}
	}
</style>
