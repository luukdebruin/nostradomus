import React from 'react'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { motion, AnimatePresence } from 'framer-motion'

const Tooltip = () => {
	const dispatch = useAppDispatch()
	const { clearTooltip } = bindActionCreators(
		{
			clearTooltip: allActionCreators.clearTooltip,
		},
		dispatch
	)
	const tooltips = useAppSelector((state) => state.app.tooltips)

	const tooltipTypes = {
		default: 'bg-blue-500',
		warning: 'bg-amber-500',
		error: 'bg-red-500',
	}

	if (tooltips.length === 0) {
		return null
	}

	return (
		<motion.div className="absolute bottom-20 md:bottom-4 flex flex-col items-center w-full z-20 bg" layout>
			<AnimatePresence>
				{tooltips.map((tooltip: Tooltip, i: number) => (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						layout
						key={i}
						className={`flex flex-col items-center max-w-xs mt-2 py-2 px-4 rounded-lg cursor-pointer ${
							tooltipTypes[tooltip.type]
						}`}
						onClick={() => clearTooltip(tooltip)}
					>
						<h3 className="text-slate-50 text-base">{tooltip.name}</h3>
						<p className="text-slate-50 text-sm">{tooltip.message}</p>
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	)
}

export default Tooltip
