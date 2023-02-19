<script lang="ts">
  import searchIcon from '$lib/assets/icons/magnifying-glass.svg';

  export let placement: string;
  export let width: string;
</script>

<div class="inline-block min-w-min {placement}">
  <button
    class="flex items-center justify-center {width} h-auto text-gray-500 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline"
    aria-label="Search"
  > 
    <img src={searchIcon} alt="Search Icon" class="w-full h-auto opacity-[.6] hover:opacity-75">
  </button>
</div>