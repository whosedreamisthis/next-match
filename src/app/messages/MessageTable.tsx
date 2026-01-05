'use client';
import { Card } from '@heroui/card';
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
import React from 'react';

type Props = {
	messages: MessageDto[];
};

export default function MessageTable({ messages }: Props) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const isOutbox = searchParams.get('container') === 'outbox';

	const columns = [
		{
			key: isOutbox ? 'recipientName' : 'senderName',
			label: isOutbox ? 'Recipient' : 'Sender',
		},
		{ key: 'text', label: 'Message' },
		{ key: 'created', label: isOutbox ? 'Date sent' : 'Date recieved' },
	];

	const handleRowSelect = (key: Key) => {
		const message = messages.find((m) => m.id === key);
		const url = isOutbox
			? `/members/${message?.recipientId}`
			: `/members/${message.senderId}`;
		router.push(url + '/chat');
	};
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
						<TableColumn key={column.key}>
							{column.label}
						</TableColumn>
					))}
				</TableHeader>
				<TableBody>
					{messages.map((row) => (
						<TableRow key={row.id} className="cursor-pointer">
							{(columnKey) => (
								<TableCell>
									{getKeyValue(row, columnKey)}
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
