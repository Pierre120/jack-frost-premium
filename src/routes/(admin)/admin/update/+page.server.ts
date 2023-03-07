import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import z from 'zod';
import jwt from 'jsonwebtoken';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const session = await locals.validate();
	const token = url.searchParams.get('token') as string || '';
	console.log(url);
	if (session) {
		throw redirect(302, '/admin'); // "/admin/login"
	}

	try {
		if (token === null) {
			return fail(400, {
				data: {
					token
				}, 
				message: 'Could not update admin password. Please try again.'
			});
		}
		const payload = jwt.verify(token, 'RSA256');
		console.log(`Payload: ${payload}`);
	} catch (err) {
		console.log(err);
		throw redirect(302, '/');
	}
};

// Schema for validating password update form data
const updateSchema = z.object({
	admin_password: z
		.string({ required_error: 'New password is required' })
		.min(8, { message: 'New password must be at least 8 characters' })
		.max(20, { message: 'New password must be less than 20 characters' })
		.trim(),
	confirm_password: z
		.string({ required_error: 'New password confirmation is required' })
		.min(8, { message: 'New password confirmation must be at least 8 characters' })
		.max(20, { message: 'New password confirmation must be less than 20 characters' })
		.trim()
}).refine((data) => data.admin_password === data.confirm_password, {
	message: "Passwords must match",
	path: ["confirm_password"]
});

export const actions: Actions = {
	default: async ({ request, url }) => {
		const formData = Object.fromEntries(await request.formData());
		const admin_password = (formData.admin_password as string) || '';
		const user_id = url.searchParams.get('ID') as string || '';
		const token = url.searchParams.get('token') as string || '';

		try {
			// Validate form data
			const result = updateSchema.safeParse(formData);
			if (!result.success) {
				console.log(admin_password);
				console.log(result.error.flatten().fieldErrors);
				return fail(400, {
					data: {
						admin_password
					},
					errors: result.error.flatten().fieldErrors
				});
			}
			console.log(result);

			const user = await auth.getUser(user_id);
			const email = user.userEmail;
			await auth.updateKeyPassword(
				'email', 
				email,
				admin_password
			);

		} catch (err) {
			console.error(err);
			return fail(400, { 
				message: 'Could not update admin password. Please try again.' 
			});
		}
		console.log(`${user_id} - ${admin_password}`);
		throw redirect(302, `/admin/update/?ID=${user_id}&token=${token}`);
	}
};
