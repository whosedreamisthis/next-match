// auth.ts
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';
import { loginSchema } from './lib/schemas/loginSchema';
import { getUserByEmail } from './app/actions/authActions';
import { compare } from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	...authConfig,
	providers: [
		...authConfig.providers.filter((p) => p.type !== 'credentials'),
		Credentials({
			async authorize(creds) {
				const validated = loginSchema.safeParse(creds);

				if (validated.success) {
					const { email, password } = validated.data;
					const user = await getUserByEmail(email);

					if (
						!user ||
						!(await compare(password, user.passwordHash))
					) {
						return null;
					}
					return user;
				}
				return null;
			},
		}),
	],
});
