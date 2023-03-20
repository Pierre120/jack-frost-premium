import type { Cart, CartItem } from '$lib/types/cart';
import type { Offering } from '$lib/types/offering';
import type { Product } from '$lib/types/product';
import { writable } from 'svelte/store';

// This is a store that holds the cart state
const CartStore = writable<Cart>({ items: [] as CartItem[], count: 0, total: 0, });

// This is a function that adds a product to the cart
export const addProductToCart = (product: Product, offering: Offering, qty: number) => {
	CartStore.update((cartState) => {
		// Check if the product is already in the cart
		const existingItem = cartState.items.find((item) => item.product.id === product.id);
		if (existingItem) {
			// If product is already in the cart, just update the quantity
			existingItem.quantity += qty;
			cartState.total += existingItem.offering.price * qty;
		} else {
			// If product is not in the cart, add it to cart
			cartState.items.push({ product, offering, quantity: qty });
			cartState.total += offering.price * qty;
			++cartState.count; // increment number of unique items in cart
		}
		return cartState;
	});
};

// This is a function that increments the quantity of a product cart item
export const incrementCartItemQuantity = (productId: string, offeringId: string) => {
	CartStore.update((cartState) => {
		// Check if the product is already in the cart
		const existingItem = cartState.items.find((item) => item.product.id === productId && item.offering.id === offeringId);
		if (existingItem) {
			// If product is already in the cart, just update the quantity
			existingItem.quantity += 1;
			cartState.total += existingItem.offering.price;
		}
		return cartState;
	});
};

// This is a function that decrements the quantity of a product cart item
export const decrementCartItemQuantity = (productId: string, offeringId: string) => {
	CartStore.update((cartState) => {
		// Check if the product is already in the cart
		const existingItem = cartState.items.find((item) => item.product.id === productId && item.offering.id === offeringId);
		if (existingItem) {
			// If product is already in the cart, just update the quantity
			existingItem.quantity -= 1;
			cartState.total -= existingItem.offering.price;
		}
		return cartState;
	});
};

// This is a function that removes a product cart item from the cart
export const removeCartItemFromCart = (productId: string, offeringId: string) => {
	CartStore.update((cartState) => {
		// Check if the product is already in the cart
		const existingItem = cartState.items.find((item) => item.product.id === productId && item.offering.id === offeringId);
		if (existingItem) {
			// If product is already in the cart, remove it from the cart
			cartState.items.splice(cartState.items.indexOf(existingItem), 1);
			cartState.total -= existingItem.offering.price * existingItem.quantity;
			// cartState.items = cartState.items.filter((item) => item.product.id !== productId);
			--cartState.count; // decrement number of unique items in cart
		}
		return cartState;
	});
};

export default CartStore;
