<script lang="ts">
  import EditProductForm from '$lib/components/Forms/Product.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<EditProductForm label="Edit Product" formaction="/api/products/edit" categories={data.categories} product={data.product} />

