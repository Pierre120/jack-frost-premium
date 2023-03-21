<script lang="ts">
  import { fade } from 'svelte/transition';
  import SuccessIcon from '$lib/components/Icons/Success.svelte';
  import Spinner from '$lib/components/Spinner.svelte';

  export let type: 'success' | 'error' | 'info' | 'warning' | 'loading';
</script>

<article class={type} role="alert" transition:fade>
  {#if type === "success"}
    <SuccessIcon size="9" />
  {:else if type === 'loading'}
    <Spinner size="9" color="white" />
  {/if}

  <div class="text">
    <slot />
  </div>
</article>

<style lang="postcss">
  article {
    @apply w-96 flex items-center gap-x-4 p-6 rounded-full shadow-md
      text-navy-blue bg-[#DDECFF] z-40;
  }

  .text {
    @apply text-2xl uppercase;
  }
</style>