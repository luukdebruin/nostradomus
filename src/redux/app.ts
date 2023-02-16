import { Action, Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { RootState, allActionCreators } from './index'
import store from './store'

export interface AppState {
	modal: JSX.Element
	errors: AppError[]
}

const initialState: AppState = {
	modal: undefined,
	errors: [],
}

export enum AppTypeKeys {
	SET_MODAL = 'SET_MODAL',
	SET_ERROR = 'SET_ERROR',
	CLEAR_ERROR = 'CLEAR_ERROR',
}

export interface SetModalAction extends Action {
	type: AppTypeKeys.SET_MODAL
	modal: JSX.Element
}

export interface SetErrorAction extends Action {
	type: AppTypeKeys.SET_ERROR
	error: AppError
}

export interface ClearErrorAction extends Action {
	type: AppTypeKeys.CLEAR_ERROR
	error: AppError
}

export type AppActionTypes = SetModalAction | SetErrorAction | ClearErrorAction

export const appActionCreators = {
	setModal(modal: JSX.Element): SetModalAction {
		return {
			type: AppTypeKeys.SET_MODAL,
			modal,
		}
	},
	setError(error: AppError): SetErrorAction {
		return {
			type: AppTypeKeys.SET_ERROR,
			error,
		}
	},
	clearError(error: AppError): ClearErrorAction {
		return {
			type: AppTypeKeys.CLEAR_ERROR,
			error,
		}
	},
}

export type AppActionCreators = typeof appActionCreators

export default function AppReducer(state = initialState, action: AppActionTypes) {
	switch (action.type) {
		case AppTypeKeys.SET_MODAL:
			return {
				...state,
				modal: action.modal,
			}
		case AppTypeKeys.SET_ERROR:
			return {
				...state,
				errors: [...state.errors, action.error],
			}
		case AppTypeKeys.CLEAR_ERROR:
			return {
				...state,
				errors: state.errors.filter((error: Error) => error !== action.error),
			}
		default:
			return state
	}
}

export function AppMiddleware(): Middleware {
	return (_: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: any) => {
		// const prevState = store.getState()
		// const state = store.getState()
		next(action)
		switch (action.type) {
			case AppTypeKeys.SET_ERROR: {
				setTimeout(() => {
					store.dispatch(allActionCreators.clearError(action.error))
				}, action.duration || 30000)
				return
			}
		}
	}
}
