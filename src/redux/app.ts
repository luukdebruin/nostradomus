import { Action, Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { RootState } from './index'

export interface AppState {
	modal: JSX.Element
}

const initialState: AppState = {
	modal: undefined,
}

export enum AppTypeKeys {
	SET_MODAL = 'SET_MODAL',
}

export interface SetModalAction extends Action {
	type: AppTypeKeys.SET_MODAL
	modal: JSX.Element
}

export type AppActionTypes = SetModalAction

export const appActionCreators = {
	setModal(modal: JSX.Element): SetModalAction {
		return {
			type: AppTypeKeys.SET_MODAL,
			modal,
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
		default:
			return state
	}
}

export function AppMiddleware(): Middleware {
	return (_: MiddlewareAPI<Dispatch, RootState>) => (next) => async (action: any) => {
		// const prevState = store.getState()
		next(action)
		// const state = store.getState()
		// switch (action.type) {

		// }
	}
}
