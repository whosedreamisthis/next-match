'use client';
import { MessageDto } from '@/types';
import { init } from 'next/dist/compiled/webpack/webpack';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import MessageBox from './MessageBox';
import { pusherClient } from '@/lib/pusher';
import { formatShortDateTime } from '@/lib/util';
import { Channel } from 'pusher-js';
import useMesageStore from '@/hooks/useMessageStore';

type Props = {
	initialMessages: { messages: MessageDto[]; readCount: number };
	currentUserId: string;
	chatId: string;
};
export default function MessageList({
	initialMessages,
	currentUserId,
	chatId,
}: Props) {
	const [messages, setMessages] = useState(initialMessages.messages);
	const channelRef = useRef<Channel | null>(null);
	const updateUnreadCount = useMesageStore(
		(state) => state.updateUnreadCount
	);
	const setReadCount = useRef(false);

	useEffect(() => {
		if (!setReadCount.current) {
			updateUnreadCount(-initialMessages.readCount);
			setReadCount.current = true;
		}
	}, [initialMessages.readCount, updateUnreadCount]);

	const handleNewMessage = useCallback((message: MessageDto) => {
		setMessages((prevState) => {
			return [...prevState, message];
		});
	}, []);

	const handleReadMessages = useCallback((messageIds: string[]) => {
		const readTime = formatShortDateTime(new Date());
		setMessages((prevState) =>
			prevState.map((message) =>
				messageIds.includes(message.id)
					? { ...message, dateRead: readTime }
					: message
			)
		);
	}, []);

	// useEffect(() => {
	// 	setMessages(initialMessages.messages);
	// }, [initialMessages.messages]);

	useEffect(() => {
		if (!pusherClient) return;
		if (!channelRef.current) {
			channelRef.current = pusherClient.subscribe(chatId);

			channelRef.current.bind('message:new', handleNewMessage);
			channelRef.current.bind('messages:read', handleReadMessages);
		}

		return () => {
			if (channelRef.current && channelRef.current.subscribed) {
				channelRef.current.unsubscribe();
				channelRef.current.unbind('message:new', handleNewMessage);
				channelRef.current.unbind('messages:read', handleReadMessages);
			}
		};
	}, [chatId, handleNewMessage, handleReadMessages]);

	return (
		<div>
			{messages.length === 0 ? (
				'No messages to display'
			) : (
				<div>
					{messages.map((message) => (
						<MessageBox
							key={message.id}
							message={message}
							currentUserId={currentUserId}
						/>
					))}
				</div>
			)}
		</div>
	);
}
