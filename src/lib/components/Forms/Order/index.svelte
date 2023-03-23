<script lang="ts">
  import SaveButton from '$lib/components/Buttons/Save.svelte';
  import DeleteButton from '$lib/components/Buttons/Delete.svelte';
  import OrderDetails from '$lib/components/Forms/Order/Details.svelte';
  import TemplateForm from '$lib/components/Forms/Template.svelte';
  import type { Order } from '$lib/types/order';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const remove = () => {
    dispatch('remove');
  };

  export let formaction: string;
  export let hasDeleteButton = false;
  export let order: Order | null = null;
  export let label = 'Order Status'

  let orderStatus = order?.payment_status ?? '';
  let formName = 'order-form';
</script>

<div class="order-form-container">
  <TemplateForm {label} {hasDeleteButton}>
    <div slot="header" class="header">
      <h3>Order Status</h3>
      <select name="payment_status" id="payment_status" form={formName}>
        <option value="NP" selected={ orderStatus === 'NP'}>Unpaid</option>
        <option value="PP" selected={ orderStatus === 'PP'}>Partially Paid</option>
        <option value="FP" selected={ orderStatus === 'FP' }>Fully Paid</option>
        <option value="SS" selected={ orderStatus === 'SS' }>Successful</option>
      </select>
    </div>
    <SaveButton slot="saveButton" form="product-form" {formaction} />
		<DeleteButton slot="deleteButton" on:remove={remove} />
    <form id={formName} class={formName} slot="body" method="POST">
      <div class="date-input-container">
        <h4>Estimated Delivery Date</h4>
        <input type="date" name="estimated_delivery" id="estimated_delivery" />
      </div>
      <div class="info-container">
        <OrderDetails {order} />
      </div>
    </form>
  </TemplateForm>
</div>
