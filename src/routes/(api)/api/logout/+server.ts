import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// This is the handler for the logout request
export const POST: RequestHandler = async ({ locals }) => {
	const session = await locals.validate();
	// If user is not logged in, redirect to home page
	if (!session) {
		// Redirect to home page
		throw redirect(302, '/');
	}

	// Log out the user
	await auth.invalidateSession(session.sessionId);
	// Clear session cookie
	locals.setSession(null);

	// Redirect to home page
	throw redirect(302, '/');
};
