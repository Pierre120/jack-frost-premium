<script lang="ts">
  import TemplateModal from '$lib/components/Modal/Template.svelte';
  import SuccessCheck from '$lib/assets/icons/success.svg' 
  import TrashCan from '$lib/assets/icons/trash-can.svg';

  export let statusHeader: string;
  export let statusInfo: string;
  export let success = false;
  export let deleted = false;
  // export let error = false;
  // export let info = false;
</script>

<TemplateModal width="w-full max-w-2xl" bgColor="bg-white" hasCloseIcon={false}>
  <h2 slot="header" class="status-header">{ statusHeader }</h2>
  <div slot="body" class="status-info">
    {#if success}
      <img src={SuccessCheck} alt="Success check"/>
    {:else if deleted}
      <img src={TrashCan} alt="Trash can" />
    {/if}
    <p>{ statusInfo }</p>
  </div>
</TemplateModal>

<style lang="postcss">
  .status-header {
    @apply font-IstokWeb font-bold text-3xl text-center text-dark-blue uppercase;
  }

  .status-info {
    @apply w-full flex items-start justify-center gap-x-6;
  }

  .status-info > img {
    @apply w-8 h-8;
  }

  .status-info > p {
    @apply font-IstokWeb text-start text-2xl text-dark-blue;
  }
</style>