import React from 'react'
import Header from './Header'
import Tooltip from './Tooltip'

interface LayoutProps {
	children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="relative container mx-auto w-full h-full px-2 md:px-4">
			<Header />
			{children}
			<Tooltip />
		</div>
	)
}

export default Layout
