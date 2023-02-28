<script lang="ts">
	import SearchButton from '$lib/components/NavBar/SearchButton.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import CartButton from '$lib/components/NavBar/CartButton.svelte';
	import NavLinks from '$lib/components/NavBar/NavLinks.svelte';
	import type { LayoutData } from '../../../routes/$types';

	export let data: LayoutData;

	let showMenu = false;
	
	function toggleNavBar(){
		showMenu = !showMenu;
	}
</script>

<!-- Navbar.svelte -->
<nav class="w-screen bg-white px-4 pt-4 pb-2">
	<div class="grid grid-cols-3 gap-4">
			<div class="flex col-span-1 pl-4 md:pl-12">
					<SearchButton placement="self-center" width="w-8" />
			</div>
			<div class="flex justify-center col-span-1">
					<Logo width="w-2/3" />
			</div>
			<div class="flex flex-row-reverse col-span-1 pr-4 md:pr-12">
					<CartButton placement="self-center" width="w-8" />
			</div>
			<div on:click={toggleNavBar} class="flex md:hidden">
					<button
					type="button"
					class="text-gray-800 hover:text-gray-400 focus:outline-none focus:text-gray-400"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
				</button>
			</div>
	</div>

	<div class= "flex-col col-span-3 mt-9 space-y-4 md:flex md:space-y-0 
							 md:items-center md:space-x-10 md:mt-0
							{showMenu? 'flex': 'hidden'}">
    	<NavLinks {data} />
	</div>
</nav>