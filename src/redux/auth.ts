import { Action, Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { RootState } from './index'
import store from './store'
import { getNpub } from 'src/nostr/user'

export interface AuthState {
	npub: string
	nsec: string
}

const initialState: AuthState = {
	npub: undefined,
	nsec: undefined,
}

export enum AuthTypeKeys {
	SET_PUBLIC_KEY = 'SET_PUBLIC_KEY',
	SET_PRIVATE_KEY = 'SET_PRIVATE_KEY',
	LOGOUT = 'LOGOUT',
}

export interface SetPublicKeyAction extends Action {
	type: AuthTypeKeys.SET_PUBLIC_KEY
	npub: string
}

export interface SetPrivateKeyAction extends Action {
	type: AuthTypeKeys.SET_PRIVATE_KEY
	nsec: string
}

export interface LogoutAction extends Action {
	type: AuthTypeKeys.LOGOUT
}

export type AuthActionTypes = SetPublicKeyAction | SetPrivateKeyAction | LogoutAction

export const authActionCreators = {
	setPublicKey(npub: string): SetPublicKeyAction {
		return {
			type: AuthTypeKeys.SET_PUBLIC_KEY,
			npub,
		}
	},
	setPrivateKey(nsec: string): SetPrivateKeyAction {
		return {
			type: AuthTypeKeys.SET_PRIVATE_KEY,
			nsec,
		}
	},
	logout(): LogoutAction {
		return {
			type: AuthTypeKeys.LOGOUT,
		}
	},
}

export type AuthActionCreators = typeof authActionCreators

export default function AuthReducer(state = initialState, action: AuthActionTypes) {
	switch (action.type) {
		case AuthTypeKeys.SET_PUBLIC_KEY:
			return {
				...state,
				npub: action.npub,
			}
		case AuthTypeKeys.SET_PRIVATE_KEY:
			return {
				...state,
				nsec: action.nsec,
			}
		case AuthTypeKeys.LOGOUT:
			return {
				npub: undefined,
				nsec: undefined,
			}
		default:
			return state
	}
}

export function AuthMiddleware(): Middleware {
	return (_: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: any) => {
		next(action)
		// const state = store.getState()
		switch (action.type) {
			case AuthTypeKeys.SET_PRIVATE_KEY: {
				// if (!state.auth.npub) {
				// 	const publicKey = getNpub(action.nsec)
				// }
				return
			}
			default:
				break
		}
	}
}
