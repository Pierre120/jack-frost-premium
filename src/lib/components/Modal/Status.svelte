<script lang="ts">
	import TemplateModal from '$lib/components/Modal/Template.svelte';
	import SuccessCheck from '$lib/assets/icons/success.svg';
	import Warning from '$lib/assets/icons/warning.svg';
	import TrashCan from '$lib/assets/icons/trash-can.svg';
	import Spinner from '$lib/components/Spinner.svelte';

	export let statusHeader: string;
	export let statusInfo: string;
	export let success = false;
	export let warning = false;
	export let deleted = false;
	export let loading = false;
	// export let error = false;
	// export let info = false;
</script>

<TemplateModal width="w-full max-w-2xl" bgColor="bg-white" hasCloseIcon={false}>
	<h2 slot="header" class="status-header">{statusHeader}</h2>
	<div slot="body" class="status-info">
		{#if success}
			<img src={SuccessCheck} alt="Success check" />
		{:else if warning}
			<img src={Warning} alt="Warning" />
		{:else if deleted}
			<img src={TrashCan} alt="Trash can" />
		{:else if loading}
			<Spinner size="8" color="blue" />
		{/if}
		<p>{statusInfo}</p>
	</div>
</TemplateModal>

<style lang="postcss">
	.status-header {
		@apply font-IstokWeb font-bold text-3xl text-center text-dark-blue uppercase;
	}

	.status-info {
		@apply w-full flex items-start justify-center gap-x-6;
	}

	.status-info > img {
		@apply w-8 h-8 object-cover;
	}

	.status-info > p {
		@apply font-IstokWeb text-start text-2xl text-dark-blue;
	}
</style>
