<script lang="ts">
	export let formaction: string;
</script>

<form method="POST" class="flex items-stretch justify-center">
	<button class="logout-btn" {formaction} type="submit">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
			<path
				d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
			/>
		</svg>
		<span>LOGOUT</span>
	</button>
</form>

<style lang="postcss">
	.logout-btn {
		@apply flex items-center justify-center gap-2 text-2xl hover:cursor-pointer;
	}

	.logout-btn:hover > svg {
		@apply fill-gray-600;
	}

	.logout-btn:hover > span {
		@apply text-gray-600;
	}

	.logout-btn > svg {
		@apply w-11 h-11 fill-gray-400;
	}

	.logout-btn > span {
		@apply font-IstokWeb align-text-bottom text-gray-400;
	}
</style>
