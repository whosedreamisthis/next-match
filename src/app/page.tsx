import Image from 'next/image';
import * as React from 'react';
import { FaRegSmile } from 'react-icons/fa';
import { Button } from '@heroui/button';
import Link from 'next/link';
import { auth } from '@/auth';

export default async function Home() {
	const session = await auth();
	return (
		<div>
			<h1 className="text-3xl text-red-500">Dating app</h1>
			<h3 className="text-2xl font-semibold">User session data:</h3>
			{session ? (
				<div>
					<pre>{JSON.stringify(session, null, 2)}</pre>
				</div>
			) : (
				<div>Not signed in</div>
			)}
			<Link href="/members">
				<Button
					color="primary"
					variant="bordered"
					startContent={<FaRegSmile size={20} />}
				>
					Press me
				</Button>
			</Link>
		</div>
	);
}
