<script lang="ts">
  import { page } from "$app/stores";
  // import type { LayoutData } from "../../../routes/$types";

  // export let data: LayoutData
</script>

<div class="flex justify-center w-100">
  <ul class="navlinks">
    <!-- {#each data.navs as nav}
      <li><a href={nav.path} class:active={$page.path === nav.path}>{nav.title}</a></li>
    {/each} -->
    <li><a href="/" class:active={$page.path === "/"}>HOME</a></li>
    <li><a href="/menu" class:active={$page.path === "/menu"}>MENU</a></li>
    <li><a href="/order" class:active={$page.path === "/order"}>ORDER</a></li>
    <li><a href="/contact" class:active={$page.path === "/contact"}>CONTACT</a></li>
    <li><a href="/about" class:active={$page.path === "/about"}>ABOUT US</a></li>
  </ul>
</div>

<style lang="postcss">
  .navlinks {
    @apply flex justify-between min-w-min min-h-min w-3/5 list-none;
  }

  .navlinks > li {
    @apply p-2 align-text-bottom;
  }

  .navlinks > li > a {
    @apply uppercase font-bold align-text-bottom text-xl text-navy-blue font-IstokWeb hover:text-primary-red;
  }

  .active {
    @apply text-primary-red;
  }
</style>