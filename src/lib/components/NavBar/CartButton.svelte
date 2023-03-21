<script lang="ts">
	// import cartIcon from '$lib/assets/icons/shopping-cart.svg';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const openShoppingCartModal = () => {
		dispatch('open');
	};

	export let placement: string;
	export let width: string;
	export let hasCartItem = false;
</script>

<div class="inline-block min-w-min {placement}">
	<button
		class="relative flex items-center justify-center {width} h-auto text-gray-500 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline"
		aria-label="Cart"
		on:click={openShoppingCartModal}
	>
		<!-- <img src={cartIcon} alt="Cart Icon" class="w-full h-auto opacity-[.6] hover:opacity-75"> -->

		<!-- shopping cart svg -->
		<!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="stroke-black hover:fill-primary-red opacity-[.6] hover:opacity-100"> -->
		<!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
		<!-- <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
    </svg> -->

		<!-- Ping -->
		{#if hasCartItem}
			<span class="absolute -top-1 -right-1 flex h-3 w-3 z-[1]">
				<span class="relative flex h-3 w-3">
					<span
						class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-red opacity-75"
					/>
					<span class="relative inline-flex rounded-full h-3 w-3 bg-primary-red" />
				</span>
			</span>
		{/if}

		<svg
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			class="w-auto h-8 stroke-black hover:stroke-primary-red fill-black hover:fill-primary-red opacity-[.6] hover:opacity-100"
			width="45.000000pt"
			height="45.000000pt"
			viewBox="0 0 45.000000 45.000000"
			preserveAspectRatio="xMidYMid meet"
		>
			<g
				transform="translate(0.000000,45.000000) scale(0.100000,-0.100000)"
				fill="inheritColor"
				stroke="none"
			>
				<path
					d="M0 430 c0 -14 7 -20 23 -20 20 0 30 -14 65 -86 l41 -87 -20 -38 c-15
        -30 -17 -44 -9 -59 10 -19 21 -20 155 -20 122 0 145 2 145 15 0 13 -21 15
        -130 15 -136 0 -147 4 -117 43 9 13 32 17 106 19 l95 3 48 83 c26 46 46 88 42
        93 -3 5 -83 9 -178 9 l-173 0 -11 25 c-9 20 -19 25 -47 25 -28 0 -35 -4 -35
        -20z"
				/>
				<path
					d="M107 72 c-22 -24 -21 -35 1 -55 25 -23 39 -21 58 8 16 24 16 27 -1
        45 -22 25 -37 25 -58 2z"
				/>
				<path
					d="M338 79 c-44 -25 -3 -93 42 -69 26 14 26 56 1 70 -23 12 -22 12 -43
        -1z"
				/>
			</g>
		</svg>
	</button>
</div>
