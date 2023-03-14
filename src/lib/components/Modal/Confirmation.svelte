<script lang="ts">
	import TemplateModal from '$lib/components/Modal/Template.svelte';
	import { createEventDispatcher } from 'svelte';

	export let confirmationHeader: string;
	export let confirmationDetails: string;
	export let cancelLabel: string;
	export let confirmLabel: string;
	// export let confirmBtnHoverColor = 'bg-primary-red'

	const dispatch = createEventDispatcher();
	const cancel = () => {
		dispatch('cancel');
	};
	const confirm = () => {
		dispatch('confirm');
	};
</script>

<TemplateModal width="max-w-2xl" bgColor="bg-white" hasCloseIcon={false}>
	<h2 slot="header" class="confirm-header">{confirmationHeader}</h2>
	<div slot="body" class="confirmation">
		<div class="confirmation-body">
			<p>{confirmationDetails}</p>
		</div>
		<div class="confirmation-footer">
			<button class="cancel-btn" on:click={cancel}>{cancelLabel}</button>
			<button class="confirm-btn" on:click={confirm}>{confirmLabel}</button>
		</div>
	</div>
</TemplateModal>

<style lang="postcss">
	.confirm-header {
		@apply font-IstokWeb font-bold text-3xl text-center text-navy-blue uppercase;
	}

	.confirmation {
		@apply w-full flex flex-col items-stretch justify-center;
	}

	.confirmation-body {
		@apply w-full flex flex-col items-stretch justify-center;
	}

	.confirmation-body > p {
		@apply font-IstokWeb text-start text-2xl text-navy-blue;
	}

	.confirmation-footer {
		@apply w-full flex flex-row items-center justify-end gap-x-4 pt-10;
	}

	.cancel-btn {
		@apply font-IstokWeb text-xl text-center text-white bg-[#BEBEBE] rounded-xl shadow-xl py-2 px-6 hover:bg-[#959595] cursor-pointer;
	}

	.confirm-btn {
		@apply font-IstokWeb text-xl text-center text-white bg-navy-blue rounded-xl shadow-xl py-2 px-6 hover:bg-primary-red cursor-pointer;
	}
</style>
