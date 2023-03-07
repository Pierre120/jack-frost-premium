<script lang="ts">
  export let label: string;
</script>

<div class="form-container">
  <div class="header">
    <h2>{ label }</h2>
    <div class="buttons">
      <slot name="saveButton" />
      <slot name="deleteButton" />
    </div>
    <button class="close">X</button>
  </div>
  <div class="body">
    <slot name="body" />
  </div>
</div>

<style lang="postcss">
  .form-container {
    @apply block w-full px-32 bg-white;
  }

  .header {
    @apply flex items-center justify-between w-full py-6;
  }

  .header > h2 {
    @apply font-IstokWeb font-bold text-start align-bottom uppercase text-4xl text-[#352F75];
  }

  .header > .buttons {
    @apply flex items-center justify-end;
  }

  .close {
    @apply absolute top-6 right-6 p-0 text-4xl font-bold text-[#A2BCDD] hover:text-[#F6162E] cursor-pointer;
  }
</style>
