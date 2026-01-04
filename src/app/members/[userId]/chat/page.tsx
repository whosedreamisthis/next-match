import React from 'react';
import CardInnerWrapper from '@/components/CardInnerWrapper';
import { divider } from '@heroui/react';
import ChatForm from './ChatForm';
import { getMessageThread } from '@/app/actions/messageActions';
import { getAuthUserId } from '@/app/actions/authActions';
import MessageBox from './MessageBox';

export default async function ChatPage({
	params,
}: {
	params: Promise<{ userId: string }>;
}) {
	const currentUserId = await getAuthUserId();
	const { userId } = await params;
	const messages = await getMessageThread(userId);

	const body = (
		<div>
			{' '}
			{messages.length === 0 ? (
				'No messages to display'
			) : (
				<div>
					{messages.map((message) => (
						<p key={message.id}>
							<MessageBox
								key={message.id}
								message={message}
								currentUserId={currentUserId}
							/>
						</p>
					))}
				</div>
			)}
		</div>
	);

	return (
		<CardInnerWrapper
			header="Chat"
			body={<div>{body}</div>}
			footer={<ChatForm />}
		/>
	);
}
