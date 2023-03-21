<script lang="ts">
  import CartItem from '$lib/components/Cart/Item.svelte';
  import CartStore from '$lib/stores/cart';
</script>

<div class="item-list">
  {#each $CartStore.items as cartItem}
    <CartItem cartItem={cartItem} />
  {/each}
</div>

<style lang="postcss">
  .item-list {
    @apply w-full flex flex-col items-center justify-center;
  }
</style>
