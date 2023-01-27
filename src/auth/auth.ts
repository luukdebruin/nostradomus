import { bindActionCreators } from 'redux'
import { useAppDispatch } from 'src/redux/hooks'
import { authActionCreators } from 'src/redux/auth'
import { generatePrivateKey, getPublicKey } from 'nostr-tools'

interface SignInProps {
	pk: string
	sk?: string
}

export const generateKeys = () => {
	const sk = generatePrivateKey()
	const pk = getPublicKey(sk)

	return [pk, sk]
}

export const SignIn = ({ pk, sk }: SignInProps) => {
	const dispatch = useAppDispatch()
	const { login } = bindActionCreators(
		{
			login: authActionCreators.login,
		},
		dispatch
	)
	return login(pk, sk)
}

export const SignOut = () => {
	const dispatch = useAppDispatch()
	const { logout } = bindActionCreators(
		{
			logout: authActionCreators.logout,
		},
		dispatch
	)
	return logout()
}
