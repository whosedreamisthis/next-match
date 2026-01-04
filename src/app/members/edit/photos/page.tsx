import React from 'react';
import { CardBody, CardHeader } from '@heroui/card';
import { Image } from '@heroui/image';
import { divider, Divider } from '@heroui/react';
import { getAuthUserId } from '@/app/actions/authActions';
import {
	getMemberByUserId,
	getMemberPhotosByUserId,
} from '@/app/actions/memberActions';
import StarButton from '@/components/StarButton';
import DeleteButton from '@/components/DeleteButton';
import ImageUploadButton from '@/components/ImageUploadButton';
import MemberPhotoUpload from './MemberPhotoUpload';
import MemberImage from '@/components/MemberImage';
import MemberPhotos from '@/components/MemberPhotos';
export default async function PhotosPage() {
	const userId = await getAuthUserId();
	const member = await getMemberByUserId(userId);
	const photos = await getMemberPhotosByUserId(userId);
	return (
		<>
			<CardHeader className="text-2xl font-semibold text-secondary">
				Edit Profile
			</CardHeader>
			<Divider />
			<CardBody>
				<MemberPhotoUpload />
				<MemberPhotos
					photos={photos}
					editing={true}
					mainImageUrl={member?.image}
				/>
			</CardBody>
		</>
	);
}
