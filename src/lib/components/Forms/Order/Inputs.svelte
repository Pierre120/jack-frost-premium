<script lang="ts">
  import type { ActionData } from "./$types";

  export let formData: ActionData;
  export let isCheckout = false;
  export let formName = "order-form";
</script>

<div class="input-section">
  <h3>Customer Details</h3>

  <div class="input-container">
    <div class="important-inputs">
      <label for="customer_name">
        Name:
      </label>
      <input type="text" name="customer_name" id="customer_name" />
      <label for="customer_name">
        TODO: Error message here
      </label>

      <label for="contact_number">
        Contact Number:
      </label>
      <input type="text" name="contact_number" id="contact_number" />
      <label for="contact_number">
        TODO: Error message here
      </label>

      <label for="payment_method">
        Payment Method:
      </label>
      <select name="payment_method" id="payment_method">
        <option value="" selected disabled>Select payment method</option>
        <option value="gcash">GCash</option>
        <option value="maya">Maya</option>
        <option value="bdo">BDO Bank Transfer</option>
      </select>
      <label for="payment_method">
        TODO: Error message here
      </label>
    </div>

    <div class="additional-input">
      <label for="additional_details" class="input-label">
        Additional Details:
      </label>
      <textarea name="additional_details" id="additional_details" class="grow" maxlength="256" />
      <label for="additional_details" class="length">
        TODO: Error message here
      </label>
    </div>
  </div>

  {#if isCheckout}
    <div class="buttons-container">
      <button class="checkout-btn" type="submit" form={formName}>Checkout</button>
      <button class="cancel-btn" type="button">Cancel</button>
    </div>
  {/if}
</div>

<style lang="postcss">
  .input-section {
    @apply flex flex-col items-stretch justify-center font-IstokWeb w-full pl-14 py-4;
  }

  .input-section > h3 {
    @apply text-start align-bottom text-5xl text-navy-blue w-full pb-6;
    /* text-[#352F75] */
  }

  .input-container {
    @apply grid grid-cols-9 justify-items-stretch content-center w-full pl-5 py-2;
  }

  .input-label {
    @apply text-start align-bottom text-3xl text-dark-blue pb-4;
  }

  .input-error {
    @apply flex items-start justify-start text-start align-bottom text-sm text-primary-red 
      w-full h-10 px-1;
  }

  .length {
    @apply text-end align-middle text-sm text-modal-backdrop w-full h-10 px-1;
  }

  .important-inputs {
    @apply flex flex-col items-stretch justify-center w-full col-span-3;
  }

  .additional-input {
    @apply flex flex-col items-stretch justify-center w-full col-start-5 col-span-5;
  }

  .buttons-container {
    @apply flex items-end justify-center w-full pt-20 gap-20;
  }

  .buttons-container > button {
    @apply w-52 px-2 py-2 text-3xl text-white rounded-lg shadow-md cursor-pointer;
  }

  .checkout-btn {
    @apply bg-navy-blue hover:bg-dark-blue;
  }

  .cancel-btn {
    @apply bg-[#BEBEBE] hover:bg-primary-red;
  }

  input, textarea, select {
    @apply w-full px-4 py-2 mt-4 text-xl text-[#666666] bg-[#ECEBFA] border border-[#352F75] rounded-lg
      focus:outline-none focus:ring-2 focus:ring-navy-blue focus:border-transparent placeholder:text-slate-400;
  }
</style>