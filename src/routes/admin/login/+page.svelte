<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<h1>Admin Login Page</h1>
<p><code>// TODO: Create login form</code></p>

<form method="POST" use:enhance>
	<label for="admin_email">
		<span>Email</span>
	</label>
	<input
		type="email"
		name="admin_email"
		id="admin_email"
		value={form?.data?.admin_email ?? ''}
		required
	/>
	<label for="admin_email">
		{#if form?.errors?.admin_email}
			<span class="error">{form?.errors?.admin_email[0]}</span>
		{/if}
	</label>
	<br />
	<label for="admin_password">
		<span>Password</span>
	</label>
	<input type="password" name="admin_password" id="admin_passwrd" required />
	<label for="admin_password">
		{#if form?.errors?.admin_password}
			<span class="error">{form?.errors?.admin_password[0]}</span>
		{/if}
	</label>
	<br />
	<button>Login</button>
</form>
<!-- <h2>{@html admin_cred}</h2> -->
