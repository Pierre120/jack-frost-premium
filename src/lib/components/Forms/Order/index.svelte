<script lang="ts">
  import SaveButton from '$lib/components/Buttons/Save.svelte';
  import DeleteButton from '$lib/components/Buttons/Delete.svelte';
  import OrderDetailsList from '$lib/components/Forms/Order/Details.svelte';
  import CustomerInputs from '$lib/components/Forms/Order/Inputs.svelte';
  import TemplateForm from '$lib/components/Forms/Template.svelte';
  import type { Order, OrderDetails } from '$lib/types/order';
  import { createEventDispatcher } from 'svelte';
  import type { CartItem } from '$lib/types/cart';
  import type { ActionData } from './$types';

  const dispatch = createEventDispatcher();

  const remove = () => {
    dispatch('remove');
  };

  export let formaction: string;
  export let items: OrderDetails[] | CartItem[];
  export let totalPrice: number;
  export let order: Order | undefined = undefined;
  export let formData: ActionData;
  export let hasSaveButton = false;
  export let hasDeleteButton = false;
  export let label = 'Order Status'

  let orderStatus = order?.payment_status ?? '';
  let formName = 'order-form';
</script>

<div class="order-form-container">
  <TemplateForm {label} {hasSaveButton} {hasDeleteButton}>
    <div slot="header" class="header">
      {#if !order}
        <h3>Order Status</h3>
        <select name="payment_status" id="payment_status" form={formName}>
          <option value="NP" selected={ orderStatus === 'NP'}>Unpaid</option>
          <option value="PP" selected={ orderStatus === 'PP'}>Partially Paid</option>
          <option value="FP" selected={ orderStatus === 'FP' }>Fully Paid</option>
          <option value="SS" selected={ orderStatus === 'SS' }>Successful</option>
        </select>
      {/if}
    </div>
    <SaveButton slot="saveButton" form="product-form" {formaction} />
		<DeleteButton slot="deleteButton" on:remove={remove} />
    <form id={formName} class={formName} slot="body" method="POST">
      <div class="date-input-container">
        <h4>Estimated Delivery Date</h4>
        <input type="date" name="estimated_delivery" id="estimated_delivery" />
      </div>
      <div class="info-container">
        <OrderDetailsList {items} {totalPrice} />
        <CustomerInputs {formData} {order} />
      </div>
    </form>
  </TemplateForm>
</div>
