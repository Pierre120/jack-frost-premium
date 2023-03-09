import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.validate();
	if (!session) {
		// throw error(401, 'Unauthorized user.'); // 401 error page
		throw redirect(303, '/'); // Redirect landing page
	}

	const categs = [
		{ id: '1', name: 'Platinum' },
		{ id: '2', name: 'Premium' },
		{ id: '3', name: 'Super Premium' }
	];

	return {
		categories: categs
	};
}) satisfies PageServerLoad;
