<script lang="ts">
  import Toast from '$lib/components/Toast/Single.svelte';

  import ToastStore from '$lib/stores/toast';
</script>

{#if $ToastStore}
  <section> <!-- class={$ToastStore.length > 0 ? 'flex': 'hidden'} -->
    {#each $ToastStore as toast}
      <Toast type={toast.type}>
        {toast.message}
      </Toast>
    {/each}
  </section>
{/if}

<style lang="postcss">
  section {
    @apply fixed top-64 left-0 right-0 mx-auto flex flex-col gap-y-4
      items-center justify-start;
  }
</style>
