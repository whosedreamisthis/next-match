'use client';
import { useNotificationChannel } from '@/hooks/useNotificationChannel';
import { usePresenceChannel } from '@/hooks/usePresenceChannel';
import { HeroUIProvider } from '@heroui/system';
import React from 'react';
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
