<script lang="ts">
  import ContactList from '$lib/components/Footer/ContactList.svelte';
  import type { LayoutData } from '../../../routes/$types';

  export let data: LayoutData;
</script>

<footer class="w-screen bg-white p-4 flex justify-center items-center">
  <ContactList {data} />
</footer>