<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	export let href: string;
	export let iconSrc: string;
	export let alt: string;
	export let label: string;
</script>

<div class="flex items-center text-start align-middle min-w-max min-h-min w-full p-2 sm:p-4">
	<Icon {href} style="p-0 w-6 sm:w-9 inline-block" src={iconSrc} {alt} clickable={true} />
	<span
		class="text-adjust pl-6 min-w-max max-w-max w-full font-IstokWeb text-2xl text-dark-navy-blue align-middle inline"
	>
		<a {href} class="cursor-pointer" rel="noreferrer" target="_blank">{label}</a>
	</span>
</div>

<style lang="postcss">

	@media(max-width: 845px){
		 .text-adjust{
            @apply text-sm;
        }
	}
</style>
