import React from 'react'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

const Error = () => {
	const dispatch = useAppDispatch()
	const { clearError } = bindActionCreators(
		{
			clearError: allActionCreators.clearError,
		},
		dispatch
	)
	const errors = useAppSelector((state) => state.app.errors)

	const errorTypes = {
		default: 'bg-blue-500',
		warning: 'bg-amber-500',
		error: 'bg-red-500',
	}

	if (errors.length === 0) {
		return null
	}

	return (
		<AnimateSharedLayout>
			<motion.div className="absolute bottom-20 md:bottom-4 flex flex-col items-center w-full z-20 bg" layout>
				<AnimatePresence>
					{errors.map((error: AppError, i: number) => (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							layout
							key={i}
							className={`flex flex-col items-center max-w-xs mt-2 py-2 px-4 rounded-lg cursor-pointer ${
								errorTypes[error.type]
							}`}
							onClick={() => clearError(error)}
						>
							<h3 className="text-slate-50 text-base">{error.name}</h3>
							<p className="text-slate-50 text-sm">{error.message}</p>
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>
		</AnimateSharedLayout>
	)
}

export default Error
