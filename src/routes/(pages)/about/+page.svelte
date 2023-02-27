<script lang="ts">
	import jfpic from '$lib/assets/images/jack.jpg';
	import carlogo from '$lib/assets/images/delivery-svgrepo-com.svg';
	import jflogo from '$lib/assets/logos/jack-frost-premium.png';
</script>

<svelte:head>
	<title>About Us | Jack Frost Premium Ice Cream</title>
</svelte:head>

<div class="min-h-screen max-w-screen flex flex-col font-IstokWeb">
	<div class="flex-1">
		<div class="mx-auto text-center px-4 pt-4 pb-5 bg-indigo-900">
			<h1 class="text-white font-bold text-5xl">ABOUT US</h1>
		</div>

		<div class="flex flex-col md:flex-row bg-white">
			<div class="md:w-1/2">
				<img src={jfpic} alt="jfpicture" class="max-w-2xl" />
			</div>
			<div class="flex items-center flex-col md:w-1/2">
				<h1 class="text-4xl font-bold text-indigo-900 mb-5 mt-5 mr-10">THE STORY</h1>
				<p class="text-xl text-center text-justify-not mr-12 text-black">
					The idea of making homemade ice cream came about only when a new Kitchen Aid mixer was
					bought and a free ice cream bowl attachment was given. This was back around 2008. <br />
					<br /><span
						>We then discovered that the quality of the ice cream that was self made was much better
						than the ones found in the grocery. Seeing a potential business behind this, we did our
						costing and saw that the only way we could proceed... <br /><span
							class="font-semibold text-blue-800">WAS TO GO HIGH END!</span
						></span
					>
				</p>
			</div>
		</div>

		<div class="items-center bg-gray-200 py-4 bg-white">
			<h1 class="text-4xl font-bold text-indigo-900 pb-5 text-center">THE FLAVORS</h1>
			<p class="text-xl text-center text-justify-not px-40 pb-6 text-black">
				The search was on for unique flavors that are not found locally. The first of the flavors we
				worked on was <span class="font-semibold text-blue-800">Basil</span>. Other flavors came
				into play after reading about it, experimenting with them, or even seeing other products
				with flavors that have not been thought of for ice cream but it is feasbile. This flavor
				development is still ongoing up to now that we now have
				<span class="font-semibold text-blue-800">24 flavors</span>; namely:
			</p>
		</div>

		<div class="flex flex-col md:flex-row">
			<div class="md:w-1/2 bg-blue-200 py-6 px-20 text-xl text-black">
				<ul class="list-disc space-y-4">
					<li><h3>Almond Spice (Almond w/ ginger)</h3></li>
					<li><h3>Basil</h3></li>
					<li><h3>Culture Comfort (cultured milk)</h3></li>
					<li><h3>Lemon Mint</h3></li>
					<li><h3>MSG (miso w/ green apple)</h3></li>
					<li><h3>Orange Rosemary</h3></li>
					<li><h3>Rosemary</h3></li>
					<li><h3>Silky Amber (salted butter caramel)</h3></li>
					<li><h3>WMD (wintermelon delight)</h3></li>
					<li><h3>Azuki Cha Cha (green tea w/ red beans)</h3></li>
					<li><h3>Butterbrew (root beer, caramel & toffee chips)</h3></li>
				</ul>
			</div>
			<div class="md:w-2/3 bg-indigo-900 text-gray-300 py-6 px-20 text-xl">
				<ul class="list-disc space-y-4">
					<li><h3>Cheesecake (blueberry, berry, strawberry, oreo or mint oreo)</h3></li>
					<li><h3>Cherries Jubilee (cherry w/ brandy)</h3></li>
					<li><h3>Choco Glacier (choco mint w/ choco mint candy)</h3></li>
					<li><h3>Energo (chocolate energy drink w/ chocolate covered popping candy)</h3></li>
					<li><h3>Gianduja (choco hazelnut)</h3></li>
					<li><h3>MaWi (mango kiwi)</h3></li>
					<li><h3>Morning Rush (coffee w/ bacon bits)</h3></li>
					<li><h3>Nuts & Roses (rose w/ pistachio nuts)</h3></li>
					<li><h3>PBJ (peanut butter & jelly)</h3></li>
					<li><h3>Raspberetto (raspberry w/ ameretto)</h3></li>
					<li><h3>White Rock (Vanilla w/ choco toffee candy)</h3></li>
				</ul>
			</div>
		</div>

		<div class="flex flex-col md:flex-row px-20 py-8 bg-white">
			<div class="md:w-2/3">
				<h1 class="text-4xl font-bold text-indigo-900 pb-2 text-center mb-10">THE NAME</h1>
				<p class="text-center text-justify-not text-2xl text-black">
					<span class="text-red-600 font-semibold">Why the name Jack Frost? </span>Jack Frost was
					the first character that was thought of when related to something cold.
				</p>
			</div>
			<div class="1/3">
				<img src={jflogo} alt="jfrost" class="max-w-lg shadow-2xl" />
			</div>
		</div>

		<div class="flex flex-col md:flex-row px-20 py-5 bg-blue-200">
			<div class="md:w-1/4">
				<img src={carlogo} alt="car" class="p-0 w-56" />
			</div>
			<div class="flex flex-col md:w-3/4 px-6">
				<h1 class="text-4xl font-bold text-indigo-900 pt-4 mb-10">ORDERING</h1>
				<p class="text-xl text-center text-justify text-black">
					The ice cream is on <span class="text-indigo-900 font-semibold">made to order basis</span>
					with a required lead time of at least 2 days depending on the size of the order. We are also
					willing to deliver to selected areas of the Metro Manila for a minimum amount.
					<span
						>Customer orders are also deliverable via Grab, Lalamove and other similar services</span
					>
				</p>
			</div>
		</div>

		<div class="bg-indigo-900 py-4">
			<h1 class="text-lg text-white font-semibold text-center">
				Currently, Jack Frost is registered at the Intellectual Property Office.
			</h1>
		</div>
	</div>
</div>
