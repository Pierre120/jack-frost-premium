<script lang="ts">
	import { enhance } from '$app/forms';
	import Logo from '$lib/components/Logo.svelte';

	const clearPassword = (pwd: string) => {
		if (pwd) {
			pwd = '';
		}
		pwd = '';
	};

	export let form;
	$: password = clearPassword(form?.data?.admin_password);

	import jfpLogo from '$lib/assets/logos/jack-frost-premium.png';
</script>

<svelte:head>
	<title>Admin Login | Jack Frost Ice Cream Premium</title>
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
				<form method="POST" use:enhance>
					<hgroup class="mb-5">
						<h2
							class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white"
						>
							Login
						</h2>
					</hgroup>
					<div class="mb-5">
						<label
							for="admin_email"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Email
						</label>
						<input
							type="email"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name="admin_email"
							placeholder="adminaccount@email.com"
							id="admin_email"
							value={form?.data?.admin_email ?? ''}
							required
						/>
						<label for="admin_email">
							{#if form?.errors?.admin_email}
								<span class="error">{form?.errors?.admin_email[0]}</span>
							{/if}
						</label>
					</div>

					<div class="mb-5">
						<label
							for="admin_password"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							<span>Password</span>
						</label>
						<input
							type="password"
							class="input input-info input-bordered text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name="admin_password"
							id="admin_password"
							placeholder="Enter your password"
							bind:value={password}
							required
						/>
						<label for="admin_password">
							{#if form?.errors?.admin_password}
								<span class="error">{form?.errors?.admin_password[0]}</span>
							{/if}
						</label>
					</div>
					<button
						class="w-full btn btn-button text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						type="submit">Submit</button
					>
				</form>
			</div>
		</div>
	</div>
</div>

<!--<p>{form?.message}</p>-->
