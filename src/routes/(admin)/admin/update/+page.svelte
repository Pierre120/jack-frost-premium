<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';
	import { goto } from '$app/navigation';
	import Logo from '$lib/components/Logo.svelte';
	import AlertSuccess from '$lib/components/Alert/Success.svelte';
	import AlertLoading from '$lib/components/Alert/Loading.svelte';
	import AlertError from '$lib/components/Alert/Error.svelte';

	export let form: ActionData;

	let isAuthenticating = false;
	let isSuccess = false;
	let isAuthError = false;
	let isPasswordError = false;
	let isConfirmError = false;

	const removePasswordError = () => {
		if (isAuthError) {
			isAuthError = false;
		}
		if (isPasswordError) {
			isPasswordError = false;
		}
	};

	const removeConfirmError = () => {
		if (isAuthError) {
			isAuthError = false;
		}
		if (isConfirmError) {
			isConfirmError = false;
		}
	};

	const submitUpdate: SubmitFunction = ({ form }) => {
		// Validation in server-side
		isAuthenticating = true;
		return async ({ result, update }) => {
			form.reset(); // Force reset form
			isAuthenticating = false;
			switch (result.type) {
				case 'redirect':
					isSuccess = true;
					// Reset form
					form.reset();
					setTimeout(() => {
						goto('/admin/login');
					}, 2000);
					break;
				case 'failure':
					// Update form message
					isAuthError = true;
					isPasswordError = true;
					isConfirmError = true;
					break;
			}
			await update();
		};
	};
</script>

<svelte:head>
	<title>Admin Password Update | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="md:container mx-auto">
	<div
		class="flex flex-col items-center justify-center lg:justify-start md:pt-4 lg:pt-20 lg:pb-0 px-6 py-8 mx-auto md:h-screen sm:max-w-md xl:max-w-xl"
	>
		<Logo width="w-full" />
		<div
			class="w-full bg-white rounded-lg shadow dark:border sm:max-w-md p-0 mt-8 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<form method="POST" use:enhance={submitUpdate}>
					<hgroup class="mb-5">
						<h2
							class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white"
						>
							Password Update
						</h2>
					</hgroup>
					<!-- Alert for failed password update -->
					{#if form?.message && isAuthError}
						<AlertError padding="pb-4 font-semibold" message={form?.message} />
					{:else if isAuthenticating}
						<AlertLoading padding="pb-4 font-semibold" message="Validating..." />
					{:else if isSuccess}
						<AlertSuccess padding="pb-4 font-semibold" message="Password successfully updated" />
					{/if}
					<div class="mb-5">
						<label
							for="admin_password"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							<span>New password</span>
						</label>
						<input
							type="password"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
							  {isPasswordError && form?.errors?.admin_password ? 'border-red-500' : ''}"
							name="admin_password"
							id="admin_password"
							placeholder="Enter your password"
							value={undefined ?? ''}
							on:keypress={removePasswordError}
							disabled={isAuthenticating || isSuccess}
						/>
						<label
							for="admin_password"
							class="block pt-1 text-red-500 text-sm font-semibold italic"
						>
							{#if form?.errors?.admin_password}
								<span class="error">{form?.errors?.admin_password[0]}</span>
							{/if}
						</label>
					</div>

					<div class="mb-5">
						<label
							for="confirm_password"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							<span>Confirm new password</span>
						</label>
						<input
							type="password"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
							  {isConfirmError && form?.errors?.confirm_password ? 'border-red-500' : ''}"
							name="confirm_password"
							id="confirm_password"
							placeholder="Confirm your password"
							value={undefined ?? ''}
							on:keypress={removeConfirmError}
							disabled={isAuthenticating || isSuccess}
						/>
						<label
							for="confirm_password"
							class="block pt-1 text-red-500 text-sm font-semibold italic"
						>
							{#if form?.errors?.confirm_password}
								<span class="error">{form?.errors?.confirm_password[0]}</span>
							{/if}
						</label>
					</div>

					<button
						class="w-full btn btn-button text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						type="submit"
						disabled={isAuthenticating || isSuccess}>Update password</button
					>
				</form>
			</div>
		</div>
	</div>
</div>
