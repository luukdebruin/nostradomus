import React, { useEffect, useState } from 'react'
import Button from './Button'
import { bindActionCreators } from 'redux'
import { useAppDispatch } from 'src/redux/hooks'
import { allActionCreators } from 'src/redux'
import { getNip19Key, isPrivateKey, isPublicKey } from 'src/nostr/user'

export default function Login() {
	const dispatch = useAppDispatch()
	const { setPublicKey, setPrivateKey, setModal, setTooltip } = bindActionCreators(
		{
			setPublicKey: allActionCreators.setPublicKey,
			setPrivateKey: allActionCreators.setPrivateKey,
			setModal: allActionCreators.setModal,
			setTooltip: allActionCreators.setTooltip,
		},
		dispatch
	)
	const [inputValue, setInputValue] = useState<string>('')
	const [isNip19, setIsNip19] = useState<boolean>(false)
	const [loginMethod, setLoginMethod] = useState<'privateKey' | 'publicKey' | 'mnemonic'>('privateKey')

	useEffect(() => checkKey(), [inputValue])

	const checkKey: () => void = () => {
		if (inputValue && inputValue !== '') {
			const isBenchPrivate = isPrivateKey(inputValue)
			const isBenchPublic = isPublicKey(inputValue)
			if (!isBenchPrivate && isBenchPublic) setLoginMethod('publicKey')
			setIsNip19(isBenchPrivate || isBenchPublic)
		}
	}

	function handleSubmit(e) {
		e.preventDefault()

		if (inputValue && inputValue !== '') {
			const key = isNip19 ? getNip19Key(inputValue) : inputValue
			if (key) {
				if (loginMethod === 'publicKey') {
					setPublicKey(key)
				} else if (loginMethod === 'privateKey') {
					setPrivateKey(key)
				}
				setModal(undefined)
			}
		}

		// if (inputValue && inputValue !== '') {
		// 	const key = isNip19 ? getNip19Key(inputValue) : inputValue
		// 	console.log(key)
		// 	if (isPublicKey(inputValue) || isPrivateKey(inputValue)) {
		// 		if (isPublicKey(inputValue)) {
		// 			try {
		// 				setPublicKey(key)
		// 				setModal(undefined)
		// 				setError({ name: 'Logged in succesfully with Public Key', message: key, type: 'default' })
		// 			} catch (error) {
		// 				setError({ name: 'That is not a correct Public Key', message: key, type: 'error' })
		// 			}
		// 		} else if (isPrivateKey(inputValue)) {
		// 			setPrivateKey(key)
		// 			setModal(undefined)
		// 			setError({ name: 'Logged in succesfully with Private Key', message: key, type: 'default' })
		// 		}
		// 	} else {
		// 		setError({ name: 'That is not a private or public key!', message: '', type: 'error' })
		// 	}
		// }
	}

	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="p-8 bg-slate-300 h-fit min-w-[400px] rounded-xl">
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col pb-2">
						<label htmlFor="pk">Public Key</label>
						<input
							id="npub"
							type="text"
							placeholder="Enter public key or private key"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
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
