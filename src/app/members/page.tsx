import { getMembers } from '../actions/memberActions';
import MemberCard from './MemberCard';

export default async function MembersPage() {
	const members = await getMembers();
	console.log('members');
	console.log(members);
	if (!members) return null;
	return (
		<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
			{members.map((member) => {
				return <MemberCard key={member.id} member={member} />;
			})}
		</div>
	);
}
