import { Action, Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { RootState } from './index'

export interface AuthState {
	pk: string
	sk: string
}

const initialState: AuthState = {
	pk: undefined,
	sk: undefined,
}

export enum AuthTypeKeys {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
}

export interface LoginAction extends Action {
	type: AuthTypeKeys.LOGIN
	pk: string
	sk: string
}

export interface LogoutAction extends Action {
	type: AuthTypeKeys.LOGOUT
}

export type AuthActionTypes = LoginAction | LogoutAction

export const authActionCreators = {
	login(pk: string, sk: string): LoginAction {
		return {
			type: AuthTypeKeys.LOGIN,
			pk,
			sk,
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
		case AuthTypeKeys.LOGIN:
			return {
				...state,
				pk: action.pk,
				sk: action.sk,
			}
		case AuthTypeKeys.LOGOUT:
			return {
				user: undefined,
			}
		default:
			return state
	}
}

export function AuthMiddleware(): Middleware {
	return (_: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: any) => {
		next(action)
		switch (action.type) {
			case AuthTypeKeys.LOGOUT: {
				return AuthReducer(undefined, action)
			}
		}
	}
}
