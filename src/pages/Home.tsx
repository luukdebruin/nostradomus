import GlobalFeed from 'src/components/GlobalFeed'
import React from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'

const Home = () => {
	const isMobile = useWindowDimensions().width < 768
	const isTablet = useWindowDimensions().width < 1280
	return (
		<div className="flex">
			<div className={`flex-1 ${isMobile ? 'hidden' : 'block'}`}>Profile</div>
			<div className="flex-1">
				<GlobalFeed />
			</div>
			<div className={`flex-1 ${isTablet ? 'hidden' : 'block'}`}>Other stuff</div>
		</div>
	)
}

export default Home
