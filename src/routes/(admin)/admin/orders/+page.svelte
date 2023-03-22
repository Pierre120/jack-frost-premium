<script lang="ts">
 	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
  import OrderList from '$lib/components/Orders/List.svelte';

  export let data: PageData;

  const editCategory = (event: CustomEvent) => {
		goto(`/admin/categories/${event.detail.category_id}`);
	};
</script>

<svelte:head>
	<title>Orders | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="flex flex-col md:flex-row h-screen">
  <div class="bg-gray-200 md:w-1/3">
    <h1>Orders page</h1>
    <code>TODO: add components for orders page</code>
    <p class="p-4">Left column</p>
  </div>
  <div class="bg-gray-400 md:w-2/3">
    <OrderList width="w-full md:max-w-[90%]" categories={}/>
  </div>
</div>

<style lang="postcss">

</style>