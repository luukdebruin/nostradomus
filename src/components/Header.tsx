import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { TbSmartHome, TbMessage2, TbBell, TbSettings, TbAsterisk, TbSearch } from 'react-icons/tb'
import { motion, AnimatePresence } from 'framer-motion'
import useWindowDimensions from 'src/hooks/useWindowDimensions'

const navTree: NavTree[] = [
	{
		name: 'Home',
		link: '/',
		icon: <TbSmartHome size={32} color="#748BA7" />,
	},
	{
		name: 'Messages',
		link: '/messages',
		icon: <TbMessage2 size={32} color="#748BA7" />,
	},
	{
		name: 'Notifications',
		link: '/notifications',
		icon: <TbBell size={32} color="#748BA7" />,
	},
	{
		name: 'Settings',
		link: '/settings',
		icon: <TbSettings size={32} color="#748BA7" />,
	},
]

const mobileNavTree: NavTree[] = [
	{
		name: 'Home',
		link: '/',
		icon: <TbSmartHome size={24} color="#748BA7" />,
	},
	{
		name: 'Messages',
		link: '/messages',
		icon: <TbMessage2 size={24} color="#748BA7" />,
	},
	{
		name: 'Notifications',
		link: '/notifications',
		icon: <TbBell size={24} color="#748BA7" />,
	},
	{
		name: 'Settings',
		link: '/settings',
		icon: <TbSettings size={24} color="#748BA7" />,
	},
]

const linkVariants = {
	hidden: { opacity: 0, width: 0, marginLeft: '0px', display: 'none' },
	visible: { opacity: 1, width: 'auto ', marginLeft: '8px', display: 'block' },
}

const linkTransition = {
	hidden: {
		duration: 0.3,
		ease: 'easeInOutQuart',
		opacity: {
			delay: 0.4,
		},
		width: {
			delay: 0.2,
		},
		marginLeft: {
			delay: 0.2,
		},
		display: {
			delay: 0,
		},
	},
	visible: {
		duration: 0.3,
		ease: 'easeInOutQuart',
		opacity: {
			delay: 0,
		},
		width: {
			delay: 0.2,
		},
		marginLeft: {
			delay: 0.2,
		},
		display: {
			delay: 0.5,
		},
	},
}

const DesktopHeader = () => {
	const { pathname } = useLocation()

	return (
		<div className="w-full p-4 my-2 bg-slate-200 rounded-xl flex justify-between items-center">
			<div className="flex items-center">
				<NavLink to="/">
					<TbAsterisk size={42} color="#748BA7" />
				</NavLink>
				<div className="mx-4">Search component</div>
			</div>
			<div className="flex">
				<AnimatePresence>
					{navTree.map((branch, i) => {
						return (
							<NavLink key={i} to={branch.link}>
								<motion.div
									className="p-2 px-4 rounded-lg flex items-center"
									animate={
										pathname === branch.link
											? {
													backgroundColor: 'rgba(255,255,255,1)',
											  }
											: {
													backgroundColor: 'rgba(255,255,255,0)',
											  }
									}
									transition={{
										type: 'easeInOut',
										duration: 0.4,
									}}
								>
									{branch.icon}
									<motion.h2
										key={i}
										variants={linkVariants}
										initial="hidden"
										animate={pathname === branch.link ? 'visible' : 'hidden'}
										exit="hidden"
										transition={pathname === branch.link ? linkTransition.hidden : linkTransition.visible}
										className="font-bold text-slate-800"
									>
										{branch.name}
									</motion.h2>
								</motion.div>
							</NavLink>
						)
					})}
				</AnimatePresence>
			</div>
		</div>
	)
}

const MobileHeader = () => {
	const { pathname } = useLocation()

	return (
		<>
			<div className="absolute w-full top-0 left-0 px-2">
				<div className="w-full p-2 mt-2 bg-slate-200 rounded-xl flex justify-between items-center">
					<NavLink to="/" className="p-2">
						<TbAsterisk size={24} color="#748BA7" />
					</NavLink>
					<div className="p-2">
						<TbSearch size={24} color="#748BA7" />
					</div>
				</div>
			</div>
			<div className="absolute w-full bottom-0 left-0 px-2">
				<div className="w-full p-2 mb-2 bg-slate-200 rounded-xl flex justify-between items-center">
					<AnimatePresence mode="wait">
						{mobileNavTree.map((branch, i) => {
							return (
								<motion.div
									key={i}
									className="p-2 px-4 rounded-lg"
									animate={
										pathname === branch.link
											? {
													backgroundColor: 'rgba(255,255,255,1)',
											  }
											: {
													backgroundColor: 'rgba(255,255,255,0)',
											  }
									}
									transition={{
										type: 'easeInOut',
										duration: 0.4,
									}}
								>
									<NavLink to={branch.link} className="flex items-center">
										{branch.icon}
									</NavLink>
								</motion.div>
							)
						})}
					</AnimatePresence>
				</div>
			</div>
		</>
	)
}

const Header = () => {
	const isMobile = useWindowDimensions().width < 768
	return isMobile ? <MobileHeader /> : <DesktopHeader />
}

export default Header
