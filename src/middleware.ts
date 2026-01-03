import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import authConfig from './auth.config'; // Import the light config
import { authRoutes, publicRoutes } from './routes';

// We extract 'auth' from the light config so it runs in the Edge Runtime
const { auth } = NextAuth(authConfig);

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isPublic = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	// 1. Allow public routes
	if (isPublic) {
		return NextResponse.next();
	}

	// 2. If on an auth route (login/register)
	if (isAuthRoute) {
		if (isLoggedIn) {
			// If already logged in, send to members
			return NextResponse.redirect(new URL('/members', nextUrl));
		}
		return NextResponse.next();
	}

	// 3. If not logged in and trying to access a protected route
	if (!isLoggedIn && !isPublic) {
		return NextResponse.redirect(new URL('/login', nextUrl));
	}

	return NextResponse.next();
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
