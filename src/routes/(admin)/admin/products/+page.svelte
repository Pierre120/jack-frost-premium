<script lang="ts">
  import AddProduct from '$lib/components/Buttons/Add.svelte';
  import { redirect } from '@sveltejs/kit';

  const addProduct = () => {
    throw redirect(303, '/admin/products/add');
  };
</script>

<div class="block">
  <AddProduct label="Add Product" on:add={addProduct} />
</div>
<!-- TODO: Product list here -->