import { z, ZodError } from 'zod';
import type { Actions } from './$types';

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
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const loginCredentials = loginSchema.parse(formData);
			console.log('SUCCESS');
			console.log(loginCredentials);
		} catch (err: unknown) {
			console.error((err as ZodError).flatten());
			const { fieldErrors: errors } = (err as ZodError).flatten();
			const { admin_password, ...rest } = formData; // for authentication
			console.log(admin_password); // Apply encryption here
			console.log(rest);
			console.log(errors);
			return {
				data: rest,
				errors
			};
		}
	}
};
