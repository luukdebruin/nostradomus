import React from 'react'
import Header from './Header'
import Error from './Error'

interface LayoutProps {
	children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="relative container mx-auto w-full h-full px-2 md:px-4">
			<Header />
			{children}
			<Error />
		</div>
	)
}

export default Layout
