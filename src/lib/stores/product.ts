import type { Product } from '$lib/types/product';
import { writable } from 'svelte/store';

// This is a store that holds the product state
const ProductStore = writable<Product>({
	id: '',
	name: '',
	description: '',
	img_src: '',
	offerings: []
});

export default ProductStore;
