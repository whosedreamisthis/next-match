'use client';
import { CldImage } from 'next-cloudinary';
import React from 'react';
import { Image } from '@heroui/image';
import { Photo } from '@prisma/client';
type Props = {
	photo: Photo | null;
};
export default function MemberImage({ photo }: Props) {
	return (
		<div>
			{photo?.publicId ? (
				<CldImage
					alt="image of member"
					src={photo.publicId}
					width={300}
					height={300}
					crop="fill"
					gravity="faces"
					className="rounded-2xl"
				/>
			) : (
				<Image
					width={300}
					src={photo?.url || '/images/user.png'}
					alt="image of user"
				/>
			)}
		</div>
	);
}
