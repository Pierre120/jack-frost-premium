<script lang="ts">
	import fb from '$lib/assets/icons/facebook.svg';
	import ig from '$lib/assets/icons/instagram.svg';
	import phone from '$lib/assets/icons/phone.svg';
	import car from '$lib/assets/images/delivery-svgrepo-com.svg';
</script>

<svelte:head>
	<title>Contact Us | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="max-w-screen flex flex-col min-h-min bg-white">
	<div class="flex-auto">
		<div class="mx-auto text-center px-4 pt-4 pb-5 bg-blue-900">
			<h1 class="text-white font-bold text-5xl">CONTACT US</h1>
		</div>
		<div class="flex flex-col md:flex-row pt-12 px-14">
			<div class="flex items-center flex-col md:w-1/3">
				<img src={fb} alt="fblogo" class="p-0 w-24" />
				<a
					href="https://www.facebook.com/jackfrostpremium"
					class="pt-2 font-semibold text-blue-900 text-2xl">Jack Frost Premium Ice Cream</a
				>
			</div>
			<div class="flex items-center flex-col md:w-1/3">
				<img src={ig} alt="iglogo" class="p-0 w-24" />
				<a
					href="https://www.instagram.com/jackfrostpremium/"
					class="pt-2 font-semibold text-blue-900 text-2xl">@jackfrostpremium</a
				>
			</div>
			<div class="flex items-center flex-col md:w-1/3">
				<img src={phone} alt="phonelogo" class="p-0 w-24" />
				<a href="/" class="pt-2 font-semibold text-blue-900 text-2xl">+639189354716</a>
			</div>
		</div>

		<div class="flex items-center flex-col pt-5">
			<img src={car} alt="carlogo" class="p-0 w-44" />
			<a href="/" class="font-semibold text-blue-900 text-2xl text-center pt-0"
				>Grab/Lalamove address:<span><br />12 Maaralin St., Diliman, Quezon City</span></a
			>
			<p class="text-blue-900 text-xl text-center pt-0">
				<br />All items are made to order, please allow 2-day lead time production
			</p>
			<p style="color:white">.</p>
		</div>
	</div>
</div>
