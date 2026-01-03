import { Spinner } from '@heroui/spinner';
import React from 'react';

export default function Loading() {
	return (
		<div className="flex justify-center items-center h-full min-h-[50vh]">
			<Spinner
				label="Loading..."
				color="secondary"
				labelColor="secondary"
				className="z-50"
			/>
		</div>
	);
}
