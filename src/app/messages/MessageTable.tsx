'use client';
import { MessageDto } from '@/types';
import { Card } from '@heroui/card';
import { Avatar } from '@heroui/avatar';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
} from '@heroui/table';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { Button } from '@heroui/button';
import { AiFillDelete } from 'react-icons/ai';
import { deleteMessage } from '../actions/messageActions';
import { truncateString } from '@/lib/util';

type Props = {
	messages: MessageDto[];
};

export default function MessageTable({ messages }: Props) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const isOutbox = searchParams.get('container') === 'outbox';
	const [isDeleting, setDeleting] = useState({ id: '', loading: false });
	const columns = [
		{
			key: isOutbox ? 'recipientName' : 'senderName',
			label: isOutbox ? 'Recipient' : 'Sender',
		},
		{ key: 'text', label: 'Message' },
		{ key: 'created', label: isOutbox ? 'Date sent' : 'Date recieved' },
		{ key: 'actions', label: 'Actions' },
	];

	const handleDeleteMessage = useCallback(
		async (message: MessageDto) => {
			setDeleting({ id: message.id, loading: true });
			await deleteMessage(message.id, isOutbox);
			router.refresh();
			setDeleting({ id: '', loading: false });
		},
		[isOutbox, router]
	);
	const handleRowSelect = (key: Key) => {
		const message = messages.find((m) => m.id === key);
		const url = isOutbox
			? `/members/${message?.recipientId}`
			: `/members/${message.senderId}`;
		router.push(url + '/chat');
	};

	const renderCell = useCallback(
		(item: MessageDto, columnKey: keyof MessageDto) => {
			const cellValue = item[columnKey];

			switch (columnKey) {
				case 'recipientName':

				case 'senderName':
					return (
						<div className="flex items-center gap-2 cursor-pointer">
							<Avatar
								alt="Image of member"
								src={
									(isOutbox
										? item.recipientImage
										: item.senderImage) ||
									'/images/user.png'
								}
							/>
							<span>{cellValue}</span>
						</div>
					);

				case 'text':
					return <div>{truncateString(cellValue, 80)}</div>;

				case 'created':
					return cellValue;
				default:
					return (
						<Button
							isIconOnly
							variant="light"
							onPress={() => {
								handleDeleteMessage(item);
							}}
							isLoading={
								isDeleting.id === item.id && isDeleting.loading
							}
						>
							<AiFillDelete size={24} className="text-danger" />
						</Button>
					);
			}
		},
		[isOutbox, isDeleting.id, isDeleting.loading, handleDeleteMessage]
	);

	return (
		<Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
			<Table
				aria-label="Message table"
				selectionMode="single"
				onRowAction={(key) => handleRowSelect(key)}
				shadow="none"
			>
				<TableHeader>
					{columns.map((column) => (
						<TableColumn
							key={column.key}
							width={column.key === 'text' ? '50%' : undefined}
						>
							{column.label}
						</TableColumn>
					))}
				</TableHeader>
				<TableBody>
					{messages.map((row) => (
						<TableRow key={row.id} className="cursor-pointer">
							{(columnKey) => (
								<TableCell
									className={`${
										!row.dateRead && !isOutbox
											? 'font-bold'
											: ''
									}`}
								>
									{renderCell(
										row,
										columnKey as keyof MessageDto
									)}
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
