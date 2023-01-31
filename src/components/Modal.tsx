import React from 'react'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'

const Modal = () => {
	const dispatch = useAppDispatch()
	const { setModal } = bindActionCreators(
		{
			setModal: allActionCreators.setModal,
		},
		dispatch
	)
	const modal = useAppSelector((state) => state.app.modal)

	if (!modal) {
		return null
	}

	return (
		<div className="absolute w-screen h-screen z-10 flex justify-center items-center">
			<div className="z-10 max-w-full lg:max-w-[50%]">{modal}</div>
			<div className="w-full h-full backdrop-blur-sm absolute" onClick={() => setModal(undefined)} />
		</div>
	)
}

export default Modal
