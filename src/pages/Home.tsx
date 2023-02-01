import GlobalFeed from 'src/components/GlobalFeed'
import React from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Profile from 'src/components/Profile'

const Home = () => {
	const isMobile = useWindowDimensions().width < 768
	const isTablet = useWindowDimensions().width < 1280
	return (
		<div className="flex justify-between overflow-auto h-full">
			<div className={`sticky self-start top-0 w-1/2 ${isMobile ? 'hidden' : 'block'}`}>
				<Profile />
			</div>
			<div className="flex-1">{/* <GlobalFeed /> */}</div>
			<div className={`sticky self-start top-0  w-1/2 ${isTablet ? 'hidden' : 'block'}`}>
				<div className="p-4 rounded-lg bg-slate-300">Other Stuff</div>
			</div>
		</div>
	)
}

export default Home
