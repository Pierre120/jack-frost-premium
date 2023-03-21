<script lang="ts">
  import CartItemComponent from '$lib/components/Cart/Item.svelte';
  import type { CartItem } from '$lib/types/cart';

  export let items: CartItem[];
</script>

<div class="item-list">
  {#each items as item}
    <CartItemComponent cartItem={item} />
  {/each}
</div>

<style lang="postcss">
  .item-list {
    @apply w-full flex flex-col items-center justify-center;
  }
</style>
