import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

// Protect logged in user from accessing login page
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	console.log(session);
	if (session) {
		// Redirect to admin home page
		throw redirect(302, '/admin');
	}
};

// Schema for validating Reset Password form data
const resetSchema = z.object({
	admin_email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.max(64, { message: 'Email must be less than 64 characters' })
		.email({ message: 'Email must be a valid email address' })
});

// Actions for the Reset page
export const actions: Actions = {
	// POST /admin/reset
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const admin_email = (formData.admin_email as string) || '';

		try {
			// Validate form data
			const result = resetSchema.safeParse(formData);
			if (!result.success) {
				console.log(admin_email);
				console.log(result.error.flatten().fieldErrors);
				return fail(400, {
					data: {
						admin_email
					},
					errors: result.error.flatten().fieldErrors
				});
			}
			console.log(result);

			// Authenticate user
			const { admin_email: email } = result.data;
			console.log(`Authentication: ${email}`);
			const key = await auth.getKeyUser('email', email);
			console.log(`Key: ${key}`);
		} catch (err) {
			console.error(err);
			console.log(admin_email);
			return fail(400, {
				data: {
					admin_email
				},
				message: 'Incorrect admin email'
			});
		}

		// Redirect to admin home page
		throw redirect(302, '/admin/login');
	}
};
