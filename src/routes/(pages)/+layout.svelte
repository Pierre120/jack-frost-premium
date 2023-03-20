<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import NavBar from '$lib/components/NavBar/index.svelte';
	import Footer from '$lib/components/Footer/index.svelte';
	import ShoppingCartModal from '$lib/components/Modal/ShoppingCart.svelte';
  import { goto } from '$app/navigation';


	const closeCart = () => {
		isViewingCart = false;
	}

	let isViewingCart = true;

	export let data: LayoutData;
</script>

<NavBar {data} />
<slot />
{#if $page.url.pathname !== '/contact'}
	<Footer {data} />
{/if}
<ShoppingCartModal on:close={closeCart} />