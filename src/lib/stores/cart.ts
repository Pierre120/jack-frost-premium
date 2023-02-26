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

// This is a function that removes a product cart item from the cart
export const removeCartItemFromCart = (productId: string) => {
  CartStore.update((cartState) => {
    // Check if the product is already in the cart
    const existingItem = cartState.items.find((item) => item.product.id === productId);
    if (existingItem) {
      // If product is already in the cart, remove it from the cart
      cartState.items.splice(cartState.items.indexOf(existingItem), 1);
      // cartState.items = cartState.items.filter((item) => item.product.id !== productId);
    }
    return cartState;
  });
};

export default CartStore;
