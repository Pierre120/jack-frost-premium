<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import NavBar from '$lib/components/NavBar/index.svelte';
	import Footer from '$lib/components/Footer/index.svelte';
	import ShoppingCartModal from '$lib/components/Modal/ShoppingCart.svelte';
	import CartStore from '$lib/stores/cart';
  import { goto } from '$app/navigation';

	const openCart = () => {
		isViewingCart = true;
		console.log('opening cart');
	};

	const closeCart = () => {
		isViewingCart = false;
		console.log('closing cart');
	};

	let isViewingCart = false;

	export let data: LayoutData;
</script>

<NavBar {data} on:open={openCart} />
<slot />
{#if $page.url.pathname !== '/contact'}
	<Footer {data} />
{/if}
{#if isViewingCart}
	<ShoppingCartModal cart={$CartStore} on:close={closeCart} />
{/if}
