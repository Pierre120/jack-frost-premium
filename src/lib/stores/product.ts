import type { Product } from "$lib/types/product";
import { writable } from "svelte/store";

// This is a store that holds the product state
const ProductStore = writable({} as Product);

export default ProductStore;
