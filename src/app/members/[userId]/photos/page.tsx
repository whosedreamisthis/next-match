import React from 'react';
import { CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/react';
import { Image } from '@heroui/image';
import { getMemberPhotosByUserId } from '@/app/actions/memberActions';

export default async function PhotosPage({
	params,
}: {
	params: Promise<{ userId: string }>;
}) {
	const { userId } = await params;
	const photos = await getMemberPhotosByUserId(userId);
	return (
		<>
			<CardHeader className="text-2xl font-semibold text-secondary">
				Photos
			</CardHeader>
			<Divider />
			<CardBody>
				<div className="grid grid-cols-5 gap-3">
					{photos &&
						photos.map((photo) => (
							<div
								key={photo.id}
								className="relative aspect-square"
							>
								<Image
									// width={300}
									// height={300}
									src={photo.url}
									alt="image of member"
									removeWrapper
									className="object-cover absolute inset-0 h-full w-full"
								/>
							</div>
						))}
				</div>
			</CardBody>
		</>
	);
}
