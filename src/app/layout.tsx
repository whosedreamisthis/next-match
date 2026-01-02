import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import TopNav from '@/components/navbar/TopNav';

export const metadata: Metadata = {
	title: 'Next Match',
	description: 'Dating App Using Nextjs',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<TopNav />
					<main className="container mx-auto p-10">{children}</main>
				</Providers>
			</body>
		</html>
	);
}
