import React from 'react'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import Login from './Login'

const Profile = () => {
	const dispatch = useAppDispatch()
	const { setModal } = bindActionCreators(
		{
			setModal: allActionCreators.setModal,
		},
		dispatch
	)
	const pk = useAppSelector((state) => state.auth.pk)
	const sk = useAppSelector((state) => state.auth.sk)

	if (!sk) {
		return (
			<div className="p-4 rounded-lg bg-slate-200">
				<h2>You are currently not logged in</h2>
				<div className="flex mt-4">
					<div
						className="py-2 px-4 bg-slate-400 inline-block rounded-md cursor-pointer mr-4"
						onClick={() => setModal(<Login />)}
					>
						Log in
					</div>
					<div className="py-2 px-4 bg-slate-300 inline-block rounded-md cursor-pointer mr-4">Create account</div>
				</div>
			</div>
		)
	}

	return <div></div>
}

export default Profile
