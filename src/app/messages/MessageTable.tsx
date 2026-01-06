'use client';
import { MessageDto } from '@/types';
import { Card } from '@heroui/card';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from '@heroui/table';

import MessageTableCell from './MessageTableCell';
import { useMessages } from '@/hooks/useMessages';

type Props = {
	initialMessages: MessageDto[];
};

export default function MessageTable({ initialMessages }: Props) {
	const {
		isOutbox,
		isDeleting,
		deleteMessage,
		selectRow,
		columns,
		messages,
	} = useMessages(initialMessages);
	return (
		<Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
			<Table
				aria-label="Message table"
				selectionMode="single"
				onRowAction={(key) => selectRow(key)}
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
									<MessageTableCell
										item={row}
										columnKey={columnKey as string}
										isOutbox={isOutbox}
										deleteMessage={deleteMessage}
										isDeleting={
											isDeleting.loading &&
											isDeleting.id === row.id
										}
									/>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}
