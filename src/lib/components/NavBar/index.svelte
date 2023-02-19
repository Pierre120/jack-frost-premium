<script lang="ts">
  import SearchButton from "$lib/components/NavBar/SearchButton.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import CartButton from "$lib/components/NavBar/CartButton.svelte";
  import NavLinks from "$lib/components/NavBar/NavLinks.svelte";
  import type { LayoutData } from "../../../routes/$types";

  export let data: LayoutData;
</script>

<nav class="w-screen bg-white px-4 pt-4 pb-2">
  <div class="grid grid-cols-3 gap-4">
    <div class="flex col-span-1 pl-12">
      <SearchButton placement="self-center" width="w-11"/>
    </div>
    <div class="flex justify-center col-span-1">
      <Logo width="w-3/5" />
    </div>
    <div class="flex flex-row-reverse col-span-1 pr-12">
      <CartButton placement="self-center" width="w-11"/>
    </div>
    <div class="col-span-3">
      <NavLinks data={data}/>
    </div>
  </div>
</nav>