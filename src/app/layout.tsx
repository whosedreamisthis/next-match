import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import TopNav from '@/components/navbar/TopNav';
import { auth } from '@/auth';

export const metadata: Metadata = {
	title: 'Next Match',
	description: 'Dating App Using Nextjs',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	const userId = session?.user?.id || null;

	return (
		<html lang="en" className="light">
			<body className="antialiased">
				<Providers userId={userId}>
					<TopNav />
					{/* Replace 'container mx-auto' with a manual max-width and px-4 */}
					<main className="max-w-screen-2xl mx-auto px-4">
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}
