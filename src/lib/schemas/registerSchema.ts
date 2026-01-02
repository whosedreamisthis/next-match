import { z } from 'zod';

export const registerSchema = z.object({
	// Old: z.string().email()
	// New:
	name: z.string().min(4),
	email: z.email({ message: 'Invalid email address' }),

	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
