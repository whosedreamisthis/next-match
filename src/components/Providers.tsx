'use client';
import { HeroUIProvider } from '@heroui/system';
import React from 'react';
// import { connect } from 'react-redux';
import { ReactNode } from 'react';

export const Providers = ({ children }: { children: ReactNode }) => {
	return <HeroUIProvider>{children}</HeroUIProvider>;
};

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(Providers);
