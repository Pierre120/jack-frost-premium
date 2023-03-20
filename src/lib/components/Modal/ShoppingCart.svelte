<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TemplateModal from '$lib/components/Modal/Template.svelte';

  const dispatch = createEventDispatcher();

  const close = () => {
    dispatch('close');
  }
</script>

<TemplateModal width="w-full max-w-7xl" on:click={close} bgColor="bg-white">
  <div slot="header">
    <h1>Shopping Cart</h1>
    <hr>
  </div>
</TemplateModal>
  
<style lang="postcss">
  h1 {
    @apply block font-IstokWeb text-navy-blue 
      font-bold text-5xl text-center pb-4;
  }

  hr {
    @apply border-2 border-navy-blue;
  }
</style>
      