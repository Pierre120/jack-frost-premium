<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from '../../../routes/$types';

	export let data: LayoutData;
</script>

<div class="flex justify-center w-2/3 {data.navbar === 'admin' ? 'max-w-xl' : ''}">
	<ul class="navlinks {data.navbar === 'admin' ? 'expand-y' : 'w-4/5'}">
		{#each data.pages as nav}
			<li class={data.navbar === 'admin' ? 'text-2xl' : 'font-bold text-xl'}>
				<a
					href={nav.href}
					class:active={$page.url.pathname === nav.href}
					class={data.navbar === 'admin' ? 'border-b-4' : 'border-b-2'}>{nav.title}</a
				>
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
		@apply uppercase font-bold font-IstokWeb align-text-bottom text-navy-blue border-transparent
			hover:text-primary-red hover:border-b-2 hover:border-primary-red block mt-4 ml-4 text-lg lg:inline-block;
	}

	.navlinks.expand-y {
		@apply items-stretch w-full;
	}

	.navlinks.expand-y > li > a {
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
