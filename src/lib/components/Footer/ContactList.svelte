<script lang="ts">
	import Contact from '$lib/components/Footer/Contact.svelte';
	import type { LayoutData } from '../../../routes/$types';

	export let data: LayoutData;
</script>

<div class="flex flex-col min-w-max max-w-max">
	{#each data.contacts as contact}
		<Contact
			href={contact.href}
			iconSrc={contact.iconSrc}
			alt={contact.alt}
			label={contact.label}
		/>
	{/each}
</div>

