import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) {
		throw redirect(302, '/admin'); // "/admin/login"
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		try {
			await auth.updateKeyPassword(
				'email', 
				email, 
				password
			);
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not update password' });
		}
		console.log(`${email} - ${password}`);
		throw redirect(302, '/admin/reset');
	}
};
