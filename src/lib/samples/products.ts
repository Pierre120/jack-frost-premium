import tmpImg from '$lib/assets/images/common.jpg';

const description =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt...';

export const products = [
	{
		id: '1',
		name: 'Basil',
		img_src: tmpImg,
		description: description,
		offerings: [
			{
				amount: 'PNT',
				other_amt: '',
				price: 980
			},
			{
				amount: 'HGAL',
				other_amt: '',
				price: 1100
			},
			{
				amount: 'GAL',
				other_amt: '',
				price: 1850
			}
		]
	},
	{
		id: '2',
		name: 'Alimasag and Shrimp',
		img_src: tmpImg,
		description: description,
		offerings: [
			{
				amount: 'PNT',
				other_amt: '',
				price: 820
			},
			{
				amount: 'HGAL',
				other_amt: '',
				price: 1020
			},
			{
				amount: 'GAL',
				other_amt: '',
				price: 1625
			}
		]
	},
	{
		id: '3',
		name: 'Salmon',
		img_src: tmpImg,
		description: description,
		offerings: [
			{
				amount: 'PNT',
				other_amt: '',
				price: 1000
			},
			{
				amount: 'HGAL',
				other_amt: '',
				price: 1400
			},
			{
				amount: 'GAL',
				other_amt: '',
				price: 1875
			}
		]
	},
	{
		id: '4',
		name: 'Seaweed',
		img_src: tmpImg,
		description: description,
		offerings: [
			{
				amount: 'PNT',
				other_amt: '',
				price: 1100
			},
			{
				amount: 'HGAL',
				other_amt: '',
				price: 1480
			},
			{
				amount: 'GAL',
				other_amt: '',
				price: 1930
			}
		]
	},
	{
		id: '5',
		name: 'Avocado',
		img_src: tmpImg,
		description: description,
		offerings: [
			{
				amount: 'PNT',
				other_amt: '',
				price: 720
			},
			{
				amount: 'HGAL',
				other_amt: '',
				price: 1360
			},
			{
				amount: 'GAL',
				other_amt: '',
				price: 1500
			}
		]
	},
	{
		id: '6',
		name: 'Cherry',
		img_src: tmpImg,
		description: description,
		offerings: [
			{
				amount: 'PNT',
				other_amt: '',
				price: 999
			},
			{
				amount: 'HGAL',
				other_amt: '',
				price: 1399
			},
			{
				amount: 'GAL',
				other_amt: '',
				price: 1799
			}
		]
	}
];

export const getProducts = async () => {
	return products;
};

export const findProduct = async (id: string) => {
	return products.find((product) => product.id === id);
};
