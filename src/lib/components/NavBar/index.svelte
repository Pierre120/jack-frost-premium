<script lang="ts">
  import SearchButton from "$lib/components/NavBar/SearchButton.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import NavLinks from "$lib/components/NavBar/NavLinks.svelte";
</script>

<nav class="w-screen bg-white px-4 pt-4 pb-2">
  <div class="grid grid-cols-3 gap-4">
    <div class="flex col-span-1 pl-12">
      <SearchButton placement="self-center" width="w-12"/>
    </div>
    <div class="flex justify-center col-span-1">
      <Logo width="w-3/5" />
    </div>
    <div class="col-span-1"></div>
    <div class="col-span-3">
      <NavLinks />
    </div>
  </div>
</nav>