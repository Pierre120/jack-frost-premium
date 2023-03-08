<script lang="ts">
  import TemplateForm from '$lib/components/Forms/Template.svelte';
  import SaveButton from '$lib/components/Buttons/Save.svelte';
  import DeleteButton from '$lib/components/Buttons/Delete.svelte';
  import tmpImg from '$lib/assets/images/tmp.png';
  import { createEventDispatcher } from 'svelte';

  export let categories: {id: string; name: string}[];
  export let label: string;
  export let formaction: string;
  export let hasImage = false;
  export let imgSrc = '';
  export let hasDeleteButton = true;

  const dispatch = createEventDispatcher();
  const remove = () => {
    dispatch('remove');
  };

</script>

<TemplateForm {label}>
  <SaveButton slot="saveButton" form='product-form' {formaction} />
  {#if hasDeleteButton}
    <DeleteButton slot="deleteButton" on:remove={remove} />
  {/if}
  <form id="product-form" class="product-form" slot="body">
    <div class="info-1">
      <div class="product-name">
        <label for="name">Product Name:</label>
        <input type="text" name="name" id="name" />
      </div>
      <div class="product-desc">
        <label for="desc">Product Description:</label>
        <input type="textbox" name="desc" id="desc" />
      </div>
    </div>
    <div class="info-2">
      <div class="product-img">
        <span class="product-img-label">Product Image:</span>
        <div class="product-image">
          <img src={hasImage ? imgSrc : tmpImg} alt="Ice cream" />
          <input type="file" name="image" id="image" accept="image/png,image/jpeg,image/jpg" />
          <label for="image" class="product-img-label">Choose an image</label>
        </div>
      </div>
      <div class="product-category">
        <label for="category">Product Category:</label>
        <select name="category" id="category">
          <option value="" disabled selected>Choose a category</option>
          {#each categories as category}
            <option value={category.id}>{category.name}</option>
          {/each}
        </select>
      </div>
    </div>
  </form>
</TemplateForm>

<style lang="postcss">
  .product-form {
    @apply flex items-center justify-center w-full;
  }

  .info-1 {
    @apply flex flex-col items-center justify-center w-2/5 pr-4;
  }

  .info-2 {
    @apply flex flex-col items-center justify-center w-3/5 pl-4;
  }

  .product-name {
    @apply flex flex-col items-center justify-center w-full;
  }

  .product-name > label {
    @apply font-IstokWeb text-start align-bottom text-3xl text-[#352F75];
  }

  .product-name > input {
    @apply w-full px-4 py-2 mt-2 text-xl text-[#666666] bg-[#ECEBFA] border-2 border-[#352F75] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6162E] focus:border-transparent;
  }

  .product-desc {
    @apply flex flex-col items-center justify-center w-full mt-4;
  }

  .product-desc > label {
    @apply font-IstokWeb text-start align-bottom text-3xl text-[#352F75];
  }

  .product-desc > input {
    @apply w-full px-4 py-2 mt-2 text-xl text-[#666666] bg-[#ECEBFA] border-2 border-[#352F75] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6162E] focus:border-transparent;
  }

  .product-img {
    @apply flex flex-col items-center justify-center w-full;
  }

  .prodct-img-label {
    @apply font-IstokWeb text-start align-bottom text-xl text-[#352F75];
  }

  .product-image {
    @apply flex items-end justify-center w-full mt-4;
  }

  .product-image > img {
    @apply w-2/3 object-cover;
  }

  .product-category {
    @apply flex flex-col items-center justify-center w-full mt-4;
  }

  .product-category > label {
    @apply font-IstokWeb text-start align-bottom text-3xl text-[#352F75];
  }

  .product-category > select {
    @apply w-full px-4 py-2 mt-2 text-xl text-[#666666] bg-[#ECEBFA] border-2 border-[#352F75] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F6162E] focus:border-transparent;
  } 
</style>
