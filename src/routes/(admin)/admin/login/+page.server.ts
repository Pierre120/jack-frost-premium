import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
// import { loginSchema } from '$lib/forms/validations/login';
import { z } from 'zod';

// Protect logged in user from accessing login page
export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	console.log(session);
	if (session) {
		// Redirect to admin home page
		throw redirect(302, '/admin/products');
	}
};

// Schema for validating login form data
const loginSchema = z.object({
	admin_email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.max(32, { message: 'Email must be less than 32 characters' })
		.email({ message: 'Email must be a valid email address' }),
	admin_password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must be at least 8 characters' })
		.max(20, { message: 'Password must be less than 20 characters' })
		.trim()
});

// Actions for the login page
export const actions: Actions = {
	// POST /admin/login
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const admin_email = (formData.admin_email as string) || '';

		try {
			// Validate form data
			const result = loginSchema.safeParse(formData);
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
			const { admin_email: email, admin_password: password } = result.data;
			console.log(`Authentication: ${email} - ${password}`);
			const key = await auth.validateKeyPassword('email', email, password);
			console.log(`Key: ${key}`);
			// Create session
			const session = await auth.createSession(key.userId);
			console.log(`Session: ${session}`);
			locals.setSession(session);
		} catch (err) {
			console.error(err);
			console.log(admin_email);
			return fail(400, {
				data: {
					admin_email
				},
				message: 'Incorrect email or password'
			});
		}

		// Redirect to admin products page
		console.log('Redirecting to admin home page');
		throw redirect(302, '/admin/products');
	}
};
