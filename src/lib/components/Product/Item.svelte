<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const showItem = () => {
    dispatch("showItem", { productId });
  };

  export let name: string;
  export let image: string;
  export let productId: string;
</script>

<div class="item-container">
  <div class="item-image" on:click={showItem}>
    <img src={image} alt={name} />
  </div>
  <div class="item-name">
    <h3 on:click={showItem}>{name}</h3>
  </div>
</div>

<style lang="postcss">
  .item-container {
    @apply flex flex-col min-w-min w-full;
  }

  .item-image {
    @apply w-full rounded-3xl shadow-md hover:shadow-xl;
  }

  .item-image > img {
    @apply w-full object-cover;
  }

  .item-name {
    @apply w-full min-w-min font-Itim text-4xl;
  }

  .item-name > h3 {
    @apply p-4 text-center text-navy-blue hover:text-dark-navy-blue;
  }
</style>
