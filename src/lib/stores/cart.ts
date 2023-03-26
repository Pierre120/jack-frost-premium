import type { Cart, CartItem } from '$lib/types/cart';
import type { Offering } from '$lib/types/offering';
import type { Product } from '$lib/types/product';
import { get, writable } from 'svelte/store';

// This is a store that holds the cart state
const CartStore = writable<Cart>({ items: [] as CartItem[], count: 0, total: 0 });

// This is a function that adds a product to the cart
export const addProductToCart = (product: Product, offering: Offering, qty: number) => {
	CartStore.update((cartState) => {
		// Check if the product is already in the cart
		const existingItem = cartState.items.find(
			(item) => item.product.id === product.id && item.offering.id === offering.id
		);
		if (existingItem) {
			// If product is already in the cart, just update the quantity
			existingItem.quantity += qty;
			cartState.total += existingItem.offering.price * qty;
		} else {
			// pre-process the offering's price
			offering.price = Number(offering.price);
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
		const existingItem = cartState.items.find(
			(item) => item.product.id === productId && item.offering.id === offeringId
		);
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
		const existingItem = cartState.items.find(
			(item) => item.product.id === productId && item.offering.id === offeringId
		);
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
		const existingItem = cartState.items.find(
			(item) => item.product.id === productId && item.offering.id === offeringId
		);
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

// This function is for retrieving the cart object
export const retrieveCart = () => {
	return get<Cart>(CartStore);
};

// This function is for clearing the cart
export const clearCart = () => {
	CartStore.update((cartState) => {
		cartState.items = [] as CartItem[];
		cartState.count = 0;
		cartState.total = 0;
		return cartState;
	});
};
//
export default CartStore;
