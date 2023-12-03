import { z } from 'zod';

const SignUpSchema = z.object({
	name: z.string(),
	email: z.string().email().trim().toLowerCase(),
	password: z.string()
});

const LoginSchema = z.object({
	email: z.string().email().trim().toLowerCase(),
	password: z.string()
});

export { SignUpSchema, LoginSchema };
