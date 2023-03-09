<script lang="ts">
	import { goto } from '$app/navigation';
	import AddProduct from '$lib/components/Buttons/Add.svelte';

	const addProduct = () => {
		goto('/admin/products/add');
	};
</script>

<div class="block">
	<AddProduct label="Add Product" on:add={addProduct} />
</div>
<!-- TODO: Product list here -->
