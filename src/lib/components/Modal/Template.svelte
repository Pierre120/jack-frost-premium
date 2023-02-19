<script lang="ts">
  import { createEventDispatcher } from "svelte";
  
  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch("closeModal");
  };

  export let width: string;
  export let hasCloseIcon = true;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal-backdrop" on:click={closeModal}>
  <div class="modal-component {width}">
    {#if hasCloseIcon}
      <button class="modal-close" on:click={closeModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    {/if}
    <div class="modal-header">
      <slot name="header" />
    </div>
    <div class="modal-body">
      <div class="product-info">
        <div class="product-info-image">
          <slot name="productImage" />
        </div>
        <slot name="productDetails" />
      </div>
      <!-- Additional slots for other modal types -->
      <slot />
    </div>
  </div>
</div>

<style lang="postcss">
  .modal-backdrop {
    @apply fixed top-0 left-0 w-full h-full px-1 pb-1 pt-[10vh] bg-modal-backdrop bg-opacity-60 flex justify-center items-start z-50;
  }

  .modal-component {
    @apply flex flex-col bg-white rounded-3xl shadow-xl p-8 relative;
  }


  .modal-header {
    @apply flex justify-center pb-6;
  }

  .modal-close {
    @apply absolute top-5 right-5 cursor-pointer;
  }

  .modal-close > svg {
    @apply stroke-close-icon /* hover:stroke-primary-red */;
  }

  .modal-close:hover > svg {
    @apply stroke-primary-red;
  }

  .modal-body {
    @apply flex flex-col justify-center w-full min-w-max;
  }

  .product-info {
    @apply grid grid-cols-2 gap-x-6;
  }

  .product-info-image {
    @apply w-full rounded-3xl shadow-sm;
  }
</style>