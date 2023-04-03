import type { LayoutLoad } from './$types';
import facebookIcon from '$lib/assets/icons/facebook.svg';
import instagramIcon from '$lib/assets/icons/instagram.svg';
import phoneIcon from '$lib/assets/icons/phone.svg';

export const load = (() => {
	return {
		// Navigation links
		pages: [
			{ title: 'HOME', href: '/' },
			{ title: 'MENU', href: '/menu' },
			{ title: 'CONTACT', href: '/contact' },
			{ title: 'ABOUT US', href: '/about' }
		],
		contacts: [
			{
				href: 'tel:+639189354716',
				iconSrc: phoneIcon,
				alt: 'Phone icon',
				label: '+639189354716'
			},
			{
				href: 'https://www.facebook.com/jackfrostpremium',
				iconSrc: facebookIcon,
				alt: 'Facebook icon',
				label: 'Jack Frost Premium Ice Cream'
			},
			{
				href: 'https://www.instagram.com/jackfrostpremium/',
				iconSrc: instagramIcon,
				alt: 'Instagram icon',
				label: '@jackfrostpremium'
			},
		],
		navbar: 'default'
	};
}) satisfies LayoutLoad;
