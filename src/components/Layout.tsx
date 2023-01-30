import React from 'react'
import Header from './Header'

interface LayoutProps {
	children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="relative container mx-auto w-full h-full px-2 md:px-4">
			<Header />
			{children}
		</div>
	)
}

export default Layout
