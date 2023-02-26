import type { Cart } from '$lib/types/cart';
import { writable } from 'svelte/store';

// This is a store that holds the cart state
const CartStore = writable({ items: [] } as Cart);

export default CartStore;
