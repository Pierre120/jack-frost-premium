<script lang="ts">
  import type { LayoutData } from '../$types';
  import NavBar from "$lib/components/NavBar/index.svelte";

  export let data: LayoutData;
</script>
<NavBar data={data}/>
<slot />