'use server';

import { messageSchema, MessageSchema } from '@/lib/schemas/messageSchema';
import { Message } from 'react-hook-form';
import { ActionResult } from '@/types';
import { getAuthUserId } from './authActions';
import { validate } from 'uuid';
import { prisma } from '@/lib/prisma';
export async function createMessage(
	recipientUserId: string,
	data: MessageSchema
): Promise<ActionResult<Message>> {
	try {
		const userId = await getAuthUserId();

		const valdiated = messageSchema.safeParse(data);

		if (!valdiated.success)
			return { status: 'error', error: valdiated.error.issues };

		const { text } = valdiated.data;
		const message = await prisma.message.create({
			data: {
				text,
				recipientId: recipientUserId,
				senderId: userId,
			},
		});
		return { status: 'success', data: message };
	} catch (error) {
		console.log(error);
		return { status: 'error', error: 'something went wrong' };
	}
}
