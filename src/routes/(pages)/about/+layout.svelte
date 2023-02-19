<script lang="ts">
  import type { LayoutData } from '../$types';
  import Footer from "$lib/components/Footer/index.svelte";
  export let data: LayoutData;
</script>

<slot />
<Footer data={data}/>