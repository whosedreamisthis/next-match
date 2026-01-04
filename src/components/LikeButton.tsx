'use client';

import { toggleLikeMember } from '@/app/actions/likeActions';
import React, { useOptimistic, useTransition } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

type Props = {
	targetId: string;
	hasLiked: boolean;
};

export default function LikeButton({ targetId, hasLiked }: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	// 1. Define the optimistic state
	const [optimisticLike, addOptimisticLike] = useOptimistic(
		hasLiked,
		(state, _) => !state // Just toggle the boolean
	);

	async function toggleLike() {
		startTransition(async () => {
			try {
				// 2. Trigger the UI change immediately
				addOptimisticLike(!hasLiked);

				// 3. Perform the actual server action
				await toggleLikeMember(targetId, hasLiked);

				// 4. Refresh the data behind the scenes
				router.refresh();
			} catch (error) {
				console.log('Failed to like:', error);
				// React will automatically revert the UI because the transition ends
			}
		});
	}

	return (
		<div
			onClick={toggleLike}
			className={`relative hover:opacity-80 transition cursor-pointer ${
				isPending ? 'opacity-70' : ''
			}`}
		>
			<AiOutlineHeart
				size={28}
				className="fill-white absolute -top-[2px] -right-[2px]"
			/>
			<AiFillHeart
				size={24}
				// 5. Use the optimisticLike variable here instead of hasLiked
				className={
					optimisticLike ? 'fill-rose-500' : 'fill-neutral-500/70'
				}
			/>
		</div>
	);
}
