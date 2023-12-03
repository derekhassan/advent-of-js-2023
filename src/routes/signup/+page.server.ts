import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { SignUpSchema } from '$lib/schemas';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
	return {};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const name = String(formData.get('name'));
		const email = String(formData.get('email'));
		const password = String(formData.get('password'));

		const signupData = {
			name,
			email,
			password
		};

		const safeParse = SignUpSchema.safeParse(signupData);

		if (!safeParse.success) {
			return fail(400, { issues: safeParse.error.issues });
		}

		const [firstName, lastName] = name.split(' ');

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email', // auth method
					providerUserId: email.toLowerCase(), // unique id when using "email" auth method
					password // hashed by Lucia
				},
				attributes: {
					email,
					firstName,
					lastName,
					password
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			console.log(e);
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, '/');
	}
};
