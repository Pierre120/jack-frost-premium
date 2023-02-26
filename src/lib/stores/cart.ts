import type { Cart } from '$lib/types/cart';
import type { Product } from '$lib/types/product';
import { writable } from 'svelte/store';

// This is a store that holds the cart state
const CartStore = writable({ items: [] } as Cart);

// This is a function that adds a product to the cart
export const addProductToCart = (product: Product, qty: number) => {
  CartStore.update((cartState) => {
    // Check if the product is already in the cart
    const existingItem = cartState.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      // If product is already in the cart, just update the quantity
      existingItem.quantity += qty;
    } else {
      // If product is not in the cart, add it to cart
      cartState.items.push({ product, quantity: qty });
    }
    return cartState;
  });
};

export default CartStore;
