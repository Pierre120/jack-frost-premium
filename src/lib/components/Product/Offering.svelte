<script lang="ts">
	import iceCream from '$lib/assets/icons/gallon.png';
	const interpretAmt = (amt: string): string => {
		let amtStr: string;
		switch (amt) {
			case 'PNT':
				amtStr = 'PINT';
				break;
			case 'HGAL':
				amtStr = 'HALF GALLON';
				break;
			case 'GAL':
				amtStr = 'GALLON';
				break;
			default:
				amtStr = other_amt;
				break;
		}
		return amtStr;
	};

	const genMaxWidth = (amt: string): string => {
		let width: string;
		switch (amt) {
			case 'PNT':
				width = 'max-w-[6rem]';
				break;
			case 'HGAL':
				width = 'max-w-[7rem]';
				break;
			case 'GAL':
				width = 'max-w-[8rem]';
				break;
			default:
				width = 'max-w-[8rem]';
				break;
		}
		return width;
	};

	const genPadding = (amt: string): string => {
		let pad: string;
		switch (amt) {
			case 'PNT':
				pad = 'pb-4';
				break;
			case 'HGAL':
				pad = 'pb-1';
				break;
			case 'GAL':
				pad = 'pb-6';
				break;
			default:
				pad = 'pb-5';
				break;
		}
		return pad;
	};

	export let amount: string;
	export let other_amt: string;
	export let price: number;
</script>

<div class="offering-container {genMaxWidth(amount)} max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
	<img src={iceCream} alt={interpretAmt(amount)} class="offering-visual" />
	<div class="offering-info">
		<div class="product-info-amount">
			{interpretAmt(amount)}
		</div>
		<div class="product-info-price {genPadding(amount)}">
			&#8369{price}
		</div>
	</div>
</div>

<style lang="postcss">
	.offering-container {
		@apply relative h-auto flex items-end;
	}

	.offering-visual {
		@apply w-full object-cover;
	}

	.offering-info {
		@apply absolute bottom-0 left-0 w-full h-full flex flex-col items-center justify-end font-IstokWeb text-xl text-[#303A6F] text-center;
	}

	.product-info-amount,
	.product-info-price {
		@apply font-bold uppercase leading-tight;
	}

</style>
