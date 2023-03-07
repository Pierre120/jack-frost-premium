<script lang="ts">
  import CategList from '$lib/components/Categories/List.svelte';
  import type { PageData } from './$types';
	import type { Category } from '$lib/types/category';
  import AddCategory from '$lib/components/Buttons/Add.svelte';

	let category: Category;
  export let data: PageData;
</script>

<svelte:head>
	<title>Categories | Jack Frost Premium Ice Cream</title>
</svelte:head>


<div class="categ-list-container min-h-screen">
  <div class="add-categ-button w-5/6 mr-24">
    <AddCategory label={'Add Category'}/> 
  </div>
  <CategList
  width="w-full md:max-w-[90%]"
  categories={data.categs}
  />
</div>



<style lang="postcss">
  .categ-list-container {
    @apply w-full h-full bg-indigo-200 flex flex-col items-center justify-start;
  }

  @media sceen and (min-width: 768px) {
    .categ-list-container {
      @apply h-full flex-row;
    }
  }

  .add-categ-button {
    @apply mt-6 
  }
</style>
