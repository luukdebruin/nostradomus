import React, { useRef } from 'react'
import { SignIn } from 'src/auth/auth'
import Button from './Button'
import { bindActionCreators } from 'redux'
import { useAppDispatch } from 'src/redux/hooks'
import { allActionCreators } from 'src/redux'

export default function Login() {
	const dispatch = useAppDispatch()
	const { login, setModal } = bindActionCreators(
		{
			login: allActionCreators.login,
			setModal: allActionCreators.setModal,
		},
		dispatch
	)
	const pkRef = useRef<HTMLInputElement>()
	const skRef = useRef<HTMLInputElement>()

	async function handleSubmit(e) {
		e.preventDefault()

		const pk = pkRef.current.value
		const sk = skRef.current.value
		login(pk, sk)
		setModal(undefined)
	}

	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="p-8 bg-slate-300 h-fit min-w-[400px] rounded-xl">
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col pb-2">
						<label htmlFor="pk">Public Key</label>
						<input
							id="pk"
							type="pk"
							ref={pkRef}
							className="appearance-none rounded-md w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>

					<div className="flex flex-col py-2">
						<label htmlFor="sk">Private Key</label>
						<input
							id="sk"
							type="sk"
							ref={skRef}
							className="appearance-none rounded-md w-full py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div>
						<Button>Login</Button>
					</div>
				</form>
				<p className="pt-4">
					Don&apos;t have an account? <Button>Create account</Button>
				</p>
			</div>
		</div>
	)
}
