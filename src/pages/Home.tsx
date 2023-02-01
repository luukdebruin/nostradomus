import Feed from 'src/components/Feed'
import React from 'react'
import Profile from 'src/components/Profile'

const Home = () => {
	return (
		<div className="flex overflow-y-auto overflow-x-hidden h-full">
			<div className="sticky self-start top-0 w-1/2 lg:w-1/3 2xl:w-1/4 hidden md:block mr-2">
				<Profile />
			</div>
			<div className="w-full md:w-1/2 lg:w-2/3 2xl:w-1/2">
				<Feed />
			</div>
			<div className="sticky self-start top-0 w-full xl:w-1/4 ml-2 hidden 2xl:block">
				<div className="p-4 rounded-lg bg-slate-300">Other Stuff</div>
			</div>
		</div>
	)
}

export default Home
