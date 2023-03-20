<script lang="ts">
	import TemplateModal from '$lib/components/Modal/Template.svelte';
  import LoadingSpinner from '$lib/components/Alert/Loading.svelte';

	export let statusHeader: string;
  export let isLoading = false;
  export let message: string;
</script>


<TemplateModal width="w-full max-w-xl" bgColor="bg-white" hasCloseIcon={false}>
	<h2 slot="header" class="status-header">{statusHeader}</h2>
	<div slot="body" class="status-info">
		{#if isLoading}
			<LoadingSpinner padding="p-4 font-semibold" message={message}/>
		{/if}
	</div>
</TemplateModal>

<style lang="postcss">
	.status-header {
		@apply font-IstokWeb font-bold text-3xl text-center text-dark-blue uppercase;
	}

	.status-info {
		@apply w-full flex items-start justify-center gap-x-6;
	}

	.status-info > p {
		@apply font-IstokWeb text-start text-2xl text-dark-blue;
	}
</style>