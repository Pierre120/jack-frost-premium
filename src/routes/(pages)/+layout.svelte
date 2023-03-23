<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import NavBar from '$lib/components/NavBar/index.svelte';
	import Footer from '$lib/components/Footer/index.svelte';
	import ShoppingCartModal from '$lib/components/Modal/ShoppingCart.svelte';
	import Toasts from '$lib/components/Toast/List.svelte';
	import CartStore from '$lib/stores/cart';

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

<Toasts />

<NavBar {data} on:open={openCart} hasCartItem={$CartStore.count > 0} />
<slot />
{#if $page.url.pathname !== '/contact' && $page.url.pathname !== '/order/checkout' && $page.url.pathname !== '/order/success'}
	<Footer {data} />
{/if}

{#if isViewingCart}
	<ShoppingCartModal cart={$CartStore} on:close={closeCart} />
{/if}
