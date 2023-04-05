<script lang="ts">
	// import searchIcon from '$lib/assets/icons/magnifying-glass.svg';

	export let placement: string;
	export let width: string;
</script>

<div class="inline-block min-w-min {placement}">
	<button
		class="flex items-center justify-center {width} h-auto text-gray-500 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline"
		aria-label="Search"
	>
		<!-- <img src={searchIcon} alt="Search Icon" class="w-full h-auto opacity-[.6] hover:opacity-75"> -->

		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			class="w-auto h-8 stroke-black hover:stroke-primary-red opacity-[.6] hover:opacity-100 "
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg>
	</button>
</div>
