import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

// 1. Properly define the shape of the global object
declare global {
	// This tells TS that 'global' might have these two properties
	var pusherServerInstance: PusherServer | undefined;
	var pusherClientInstance: PusherClient | undefined;
}

// 2. Initialize Server (Node.js side)
export const pusherServer =
	globalThis.pusherServerInstance ||
	new PusherServer({
		appId: process.env.PUSHER_APP_ID!,
		key: process.env.NEXT_PUBLIC_PUSHER_API_KEY!,
		secret: process.env.PUSHER_SECRET!,
		cluster: 'us3',
		useTLS: true,
	});

if (process.env.NODE_ENV !== 'production') {
	globalThis.pusherServerInstance = pusherServer;
}

// 3. Initialize Client (Browser side)
export const pusherClient =
	typeof window !== 'undefined'
		? globalThis.pusherClientInstance ||
		  new PusherClient(process.env.NEXT_PUBLIC_PUSHER_API_KEY!, {
				cluster: 'us3',
				// If you use private channels later, add authEndpoint here
		  })
		: undefined;

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
	globalThis.pusherClientInstance = pusherClient;
}
