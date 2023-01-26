import { Action, Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { RootState } from './index'

export interface AppState {
	counter: number
}

const initialState: AppState = {
	counter: 0,
}

export enum AppTypeKeys {
	INCREMENT = 'INCREMENT',
}

export interface IncrementAction extends Action {
	type: AppTypeKeys.INCREMENT
}

export type AppActionTypes = IncrementAction

export const appActionCreators = {
	increment(): IncrementAction {
		return {
			type: AppTypeKeys.INCREMENT,
		}
	},
}

export type AppActionCreators = typeof appActionCreators

export default function AppReducer(state = initialState, action: AppActionTypes) {
	switch (action.type) {
		case AppTypeKeys.INCREMENT:
			return {
				...state,
				counter: state.counter + 1,
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
