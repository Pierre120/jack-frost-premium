import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { transporter } from '$lib/server/nodemailer';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import AlertSuccess from '$lib/components/Alert/Success.svelte';
import AlertLoading from '$lib/components/Alert/Loading.svelte';
import AlertWarning from '$lib/components/Alert/Warning.svelte';
import AlertError from '$lib/components/Alert/Error.svelte';

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
		.max(32, { message: 'Email must be less than 32 characters' })
		.email({ message: 'Email must be a valid email address' })
});

// Actions for the Reset page
export const actions: Actions = {
	// POST /admin/reset
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const admin_email = (formData.admin_email as string) || '';
		let payload = {};
		let user_id = '';

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
			const { key, user } = await auth.getKeyUser('email', email);
			console.log(`Key: ${key} - User ID: ${user.userId}`);
			payload = user;
			user_id = user.userId;
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

		const token = jwt.sign(payload, 'RSA256', { expiresIn: '10m' });
		const link = `127.0.0.1:5173/admin/update/?ID=${user_id}&token=${token}`; //Update host/port
		console.log(`Password reset URL: ${link}`);

		// send mail with defined transport object
		let mail = await transporter.sendMail({
			from: '"Jack Frost" <jackfrosttest2023@gmail.com>', // Change
			to: admin_email, // list of receivers
			subject: 'Jack Frost Admin Password Reset', // Subject line
			text: `${link}`, // plain text body
			html: `<h1>Please click the link below to reset your password: <h1>
						 <br>
						 <b>${link}<b>
						 <br>
						 <h6>Note: Link is only valid for 10 minutes.<h6>`,
		});
	
		console.log('Message sent: %s', mail.messageId);

		throw redirect(302, '/admin/reset');
	}
};
