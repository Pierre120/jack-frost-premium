import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { z, ZodError } from 'zod';
import type { Actions, PageServerLoad } from './$types';

// Protect logged in user from accessing login page
export const load: PageServerLoad = async({ locals }) => {
	const session = await locals.validate();
	console.log(session);
	if(session) {
		// Redirect to admin home page
		throw redirect(302, '/admin');
	}
}

// Schema for validating login form data
const loginSchema = z.object({
	admin_email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.max(64, { message: 'Email must be less than 64 characters' })
		.email({ message: 'Email must be a valid email address' }),
	admin_password: z
		.string({ required_error: 'Password is required' })
		.min(8, { message: 'Password must be at least 8 characters' })
		.max(32, { message: 'Password must be less than 32 characters' })
		.trim()
});

// Actions for the login page
export const actions: Actions = {
	// POST /admin/login
	default: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			// Validate form data
			const result = loginSchema.safeParse(formData);
			if(!result.success) {
				const admin_email = formData.admin_email as string || '';
				console.log(admin_email)
				console.log(result.error.flatten().fieldErrors);
				return {
					data: { admin_email },
					errors: result.error.flatten().fieldErrors
				}
			}
			console.log(result);

			// Authenticate user
			const { admin_email: email, admin_password: password } = result.data;
			console.log(`Authentication: ${email} - ${password}`);
			const key = await auth.validateKeyPassword('username', email, password);
			console.log(`Key: ${key}`);
			const session = await auth.createSession(key.userId);
			console.log(`Session: ${session}`);
			locals.setSession(session);
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not log in user.'});
		}

		// Redirect to admin home page
		throw redirect(302, '/admin');
	}
};
