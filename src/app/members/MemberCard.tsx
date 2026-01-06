'use client';
import LikeButton from '@/components/LikeButton';
import PresenceDot from '@/components/PresenceDot';
import { calculateAge, transformImageUrl } from '@/lib/util';
import { Card, CardFooter } from '@heroui/card';
import { Image } from '@heroui/react';
import { Member } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

type Props = {
	member: Member;
	likeIds: string[];
};

export default function MemberCard({ member, likeIds }: Props) {
	const hasLiked = likeIds.includes(member.userId);
	const preventLinkAction = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};
	return (
		<Card
			fullWidth
			as={Link}
			href={`/members/${member.userId}`}
			isPressable
			className="relative" // Ensure the card is the anchor for absolute elements
		>
			<Image
				isZoomed
				alt={member.name}
				src={transformImageUrl(member.image) || '/images/user.png'}
				// Remove all fixed width/height props
				className="aspect-square object-cover w-full"
				classNames={{
					wrapper: 'w-full !max-w-full', // Forces the container to fill the card
					img: 'w-full h-full', // Forces the image to fill the container
				}}
			/>
			<div onClick={preventLinkAction} onMouseDown={preventLinkAction}>
				<div
					className="absolute top-3 right-3 z-50"
					onPointerDown={(e) => e.stopPropagation()}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					<LikeButton targetId={member.userId} hasLiked={hasLiked} />
				</div>
				<div className="absolute top-2 left-3 z-50">
					<PresenceDot member={member} />
				</div>
			</div>
			<CardFooter className="flex justify-start bg-black bg-dark-gradient overflow-hidden absolute bottom-0 z-10">
				<div className="flex flex-col text-white">
					<span className="font-semibold">
						{member.name}, {calculateAge(member.dateOfBirth)}
					</span>
					<span className="text-sm">{member.city}</span>
				</div>
			</CardFooter>
		</Card>
	);
}
