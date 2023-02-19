<script lang="ts">
  import iceCream from '$lib/assets/assets/icons/gallon.png';
  const interpretAmt = (amt: string):string => {
    let amtStr: string;
    switch(amt) {
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

  const genMaxWidth = (amt: string):string => { 
    let width: string;
    switch(amt) {
      case 'PNT':
        width = 'max-w-[8rem]';
        break;
      case 'HGAL':
        width = 'max-width-[7rem]';
        break;
      case 'GAL':
        width = 'max-w-[6rem]';
        break;
      default:
        width = other_amt;
        break;
    }
    return width;
  };

  export let maxWidth: string;
  export let amount: string;
  export let other_amt: string;
  export let price: number;
</script>

<div class="offering-container {genMaxWidth(maxWidth)}">
  <img src={iceCream} alt={interpretAmt(amount)} class="offering-visual"/>
  <div class="offering-info">
    <div class="product-info-amount">
      {amount}
    </div>
    <div class="product-info-price">
      {price}
    </div>
  </div>
</div>

<style lang="postcss">
  .offering-container {
    @apply relative h-auto;
  }

  .offering-visual {
    @apply w-full object-cover;
  }

  .offering-info {
    @apply absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center font-IstokWeb text-xl text-[#303A6F] text-center;
  }

  .product-info-amount, .product-info-price {
    @apply font-bold py-2;
  }
</style>