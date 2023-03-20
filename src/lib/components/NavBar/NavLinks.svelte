<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from '../../../routes/$types';

	export let data: LayoutData;
	export let isAdmin = false;
</script>

<div class="flex justify-center w-2/3 {isAdmin ? 'max-w-xl' : ''}">
	<ul class="navlinks {isAdmin ? 'expand-y' : 'w-4/5'}">
		{#each data.pages as nav}
			<li class={isAdmin ? 'text-2xl' : 'font-bold text-xl'}>
				<a href={nav.href} class:active={$page.url.pathname === nav.href} class={isAdmin ? 'border-b-4' : 'border-b-2'}>{nav.title}</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	.navlinks {
		@apply flex flex-wrap justify-between min-w-min min-h-min list-none gap-4;
	}

	.navlinks > li {
		@apply p-2 align-text-bottom;
	}

	.navlinks > li > a {
		@apply px-2 uppercase font-IstokWeb align-text-bottom text-navy-blue border-transparent hover:text-primary-red hover:border-primary-red block mt-4 lg:inline-block h-full;
	}

	.navlinks.expand-y {
		@apply items-stretch w-full;
	}

	.navelinks.expand-y > li > a {
		@apply h-full;
	}

	.active {
		@apply text-primary-red !important;
		@apply border-primary-red !important;
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
