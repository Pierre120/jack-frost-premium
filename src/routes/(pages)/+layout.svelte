<script lang="ts">
  import type { LayoutData } from '../$types';
  import NavBar from "$lib/components/NavBar/index.svelte";
  import Footer from "$lib/components/Footer/index.svelte";

  export let data: LayoutData;
</script>

<NavBar data={data}/>
<slot />
<Footer data={data}/>