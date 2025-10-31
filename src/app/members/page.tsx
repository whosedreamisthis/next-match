import Link from 'next/link';
import React from 'react';

export default function Members() {
	return (
		<div>
			<h3 className="text-3xl">This will be the members page.</h3>
			<Link href="/">go back home</Link>
		</div>
	);
}
