import type { Product } from "$lib/types/product";
import { writable } from "svelte/store";

const ProductStore = writable({} as Product);

export default ProductStore;
