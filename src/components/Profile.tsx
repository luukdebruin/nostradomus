import React from 'react'
import { bindActionCreators } from 'redux'
import { allActionCreators } from 'src/redux'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import Login from './Login'
import Button from './Button'

const Profile = () => {
	const dispatch = useAppDispatch()
	const { setModal, logout } = bindActionCreators(
		{
			setModal: allActionCreators.setModal,
			logout: allActionCreators.logout,
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
					<Button className="mr-4" onClick={() => setModal(<Login />)}>
						Log in
					</Button>
					<Button variant="secondary" onClick={() => setModal(<Login />)}>
						Create account
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className="p-4 rounded-lg bg-slate-200">
			<h2>{pk}</h2>
			<div className="flex mt-4">
				<Button onClick={logout}>Log out</Button>
			</div>
		</div>
	)
}

export default Profile
