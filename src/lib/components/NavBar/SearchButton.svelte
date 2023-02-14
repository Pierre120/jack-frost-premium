<script lang="ts">
  import searchIcon from '$lib/assets/icons/magnifying-glass.svg';

  export let placement: string;
</script>

<div class="inline-block min-w-min {placement}">
  <button
    class="flex items-center justify-center w-10 h-10 text-gray-500 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline"
    aria-label="Search"
  > 
    <img src={searchIcon} alt="Search Icon" class="w-9 h-9 opacity-[.6] hover:opacity-75">
  </button>
</div>