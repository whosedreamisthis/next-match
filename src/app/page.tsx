import Image from 'next/image';
import * as React from 'react';

import { Button } from '@heroui/button';
export default function Home() {
	return (
		<div>
			<h1 className="text-3xl text-red-500">Dating app</h1>
			<Button>Press me</Button>
		</div>
	);
}
