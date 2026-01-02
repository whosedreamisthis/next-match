'use client';
import Image from 'next/image';
import * as React from 'react';
import { FaRegSmile } from 'react-icons/fa';
import { Button } from '@heroui/button';
import Link from 'next/link';
export default function Home() {
	return (
		<div>
			<h1 className="text-3xl text-red-500">Dating app</h1>
			<Button
				as={Link}
				href="/members"
				color="primary"
				variant="bordered"
				startContent={<FaRegSmile size={20} />}
			>
				Press me
			</Button>
		</div>
	);
}
