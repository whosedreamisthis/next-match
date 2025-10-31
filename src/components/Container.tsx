'use client';
import React from 'react';

// This is now a Client Component
export default function Container({ children }: { children: React.ReactNode }) {
	return <main className="container mx-auto p-10">{children}</main>;
}
