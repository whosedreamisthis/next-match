'use client';
import { getUnreadMessageCount } from '@/app/actions/messageActions';
import useMessageStore from '@/hooks/useMessageStore';
import { useNotificationChannel } from '@/hooks/useNotificationChannel';
import { usePresenceChannel } from '@/hooks/usePresenceChannel';
import { HeroUIProvider } from '@heroui/system';
import React, { useCallback, useEffect } from 'react';
// import { connect } from 'react-redux';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
export const Providers = ({
	children,
	userId,
}: {
	children: ReactNode;
	userId: string | null;
}) => {
	const updateUnreadCount = useMessageStore(
		(state) => state.updateUnreadCount
	);

	const setUnreadCount = useCallback(
		(amount: number) => {
			updateUnreadCount(amount);
		},
		[updateUnreadCount]
	);

	useEffect(() => {
		if (userId) {
			getUnreadMessageCount().then((count) => {
				setUnreadCount(count);
			});
		}
	}, [setUnreadCount, userId]);

	usePresenceChannel();
	useNotificationChannel(userId);
	return (
		<HeroUIProvider>
			<ToastContainer
				position="bottom-right"
				hideProgressBar
				className="z-50"
			/>
			{children}
		</HeroUIProvider>
	);
};

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(Providers);
