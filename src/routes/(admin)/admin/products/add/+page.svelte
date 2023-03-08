<script lang="ts">
  import AddProductForm from '$lib/components/Forms/Product.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  let hasImage = false;
  let imgSrc = '';
</script>

<AddProductForm
  label="Add Product"
  formaction="/api/products/add"
  categories={data.categories}
  {hasImage}
  {imgSrc}
/>
