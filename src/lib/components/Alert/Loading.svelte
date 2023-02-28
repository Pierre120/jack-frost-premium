<script lang="ts">
  import Spinner from "$lib/components/Spinner.svelte";
  export let padding: string;
  export let message: string;
</script>

<div class="w-full {padding}">
  <div class="alert alert-info shadow-lg text-sm text-gray-900">
    <div>
      <Spinner color="gray" size="6" />
      <span>{message}</span>
    </div>
  </div>
</div>
