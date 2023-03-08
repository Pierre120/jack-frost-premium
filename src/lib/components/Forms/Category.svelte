<script lang="ts">
  import TemplateForm from '$lib/components/Forms/Template.svelte';
  import SaveButton from '$lib/components/Buttons/Save.svelte';
  import DeleteButton from '$lib/components/Buttons/Delete.svelte';

  export let label: string;
  export let form:  string;
  export let formaction: string;
  export let hasDeleteButton: false;[]
</script>

<TemplateForm {label}>
  {#if hasDeleteButton}
    <DeleteButton slot="deleteButton" />
  {/if}
  <form class="categ-form" slot="body">
    <div class="info-1">
      <label for="name">Category Name:</label>
      <input type="text" name="name" id="name" />
    </div>
    <div class="info-2">
      <label for="size">Size Name:</label>
      <input type="text" name="size" id="name" />
    </div>
  </form>
</TemplateForm>

