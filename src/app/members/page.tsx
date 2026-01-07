import PaginationComponent from '@/components/PaginationComponent';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';
import { getMembers } from '../actions/memberActions';
import MemberCard from './MemberCard';
import { UserFilters } from '@/types';

export default async function MembersPage({
	searchParams,
}: {
	searchParams: UserFilters;
}) {
	const members = await getMembers(searchParams);
	const likeIds = await fetchCurrentUserLikeIds();

	if (!members) return null;

	return (
		// In page.tsx
		<>
			<div className="mt-10 px-4 flex justify-center">
				{/* Outer wrapper to center the grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 max-w-fit mx-auto">
					{members.map((member) => (
						<MemberCard
							key={member.id}
							member={member}
							likeIds={likeIds}
						/>
					))}
				</div>
			</div>
			<PaginationComponent />
		</>
	);
}
