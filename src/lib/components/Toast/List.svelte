<script lang="ts">
  import Toast from '$lib/components/Toast/Single.svelte';

  import ToastStore from '$lib/stores/toast';
</script>

{#if $ToastStore}
  <section>
    {#each $ToastStore as toast}
      <Toast type={toast.type}>
        {toast.message}
      </Toast>
    {/each}
  </section>
{/if}

<style lang="postcss">
  section {
    @apply fixed top-0 left-0 right-0 w-full flex flex-col gap-y-4 p-10
      items-center justify-start z-40;
  }
</style>
