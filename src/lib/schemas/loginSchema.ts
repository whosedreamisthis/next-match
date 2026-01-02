import { z } from 'zod';

export const loginSchema = z.object({
	// Old: z.string().email()
	// New:
	email: z.email({ message: 'Invalid email address' }),

	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
