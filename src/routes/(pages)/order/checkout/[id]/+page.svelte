<script lang="ts">
	import SuccessIcon from '$lib/components/Icons/Success.svelte';
  import { set } from 'zod';
  import type { PageData } from './$types';


	const copyToClipboard = () => {
		navigator.clipboard.writeText(`Order #${Number(data.order_number.number).toString().padStart(5,'0') ?? '*****'}`);
		tooltip = 'Copied!';
		setTimeout(() => {
			tooltip = 'Click to copy';
		}, 1000);
	}

	export let data: PageData;
	
	let showTooltip = false;
	let tooltip = 'Click to copy';
</script>

<svelte:head>
	<title>Order Checkout | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="checkout-container">
	<div class="w-48">
		<SuccessIcon size="48" />
	</div>
	<h3>Order Successful</h3>
	<p class="reminder">
		Your order has been successfully placed and is now processing. 
		A representative will contact you soon. Please screenshot and 
		take note of your Order Number before leaving this page
	</p>
	<p class="order-num">
		<span>
			Order #{ Number(data.order_number.number).toString().padStart(5,'0') ?? '*****' }
		</span>
		<span class="tooltip {showTooltip ? 'tooltip-open tooltip-right' : ''}" data-tip={tooltip}>
			<button on:mouseenter={() => { showTooltip = true }} on:mouseleave={() => { showTooltip = false}} on:click={copyToClipboard} >
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
				</svg>
			</button>
		</span>	
	</p>
</div>

<style lang="postcss">
	.checkout-container {
		@apply w-full min-h-full bg-white flex flex-col gap-8 
			items-center justify-start py-4 font-IstokWeb;
	}

	h3 {
		@apply text-6xl font-bold text-navy-blue;
	}

	.reminder {
		@apply text-3xl text-center text-dark-blue max-w-4xl;
	}

	.order-num {
		@apply flex gap-4 items-start justify-start text-4xl text-dark-blue;
	}

	button {
		@apply bg-slate-100 border outline-none p-1 rounded-lg shadow-md hover:ring-1 hover:ring-slate-400;
	}
</style>
