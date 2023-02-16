import { Action, Middleware, MiddlewareAPI, Dispatch } from 'redux'
import { RootState, allActionCreators } from './index'
import store from './store'
import { relayUrls } from 'src/nostr/relay'

export interface AppState {
	modal: JSX.Element
	errors: AppError[]
	relays: Relays
}

const initialState: AppState = {
	modal: undefined,
	errors: [],
	relays: relayUrls,
}

export enum AppTypeKeys {
	SET_MODAL = 'SET_MODAL',
	SET_ERROR = 'SET_ERROR',
	CLEAR_ERROR = 'CLEAR_ERROR',
	ADD_RELAY = 'ADD_RELAY',
	REMOVE_RELAY = 'REMOVE_RELAY',
	UPDATE_RELAY = 'UPDATE_RELAY',
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

export interface AddRelayAction extends Action {
	type: AppTypeKeys.ADD_RELAY
	relay: Relay
}

export interface RemoveRelayAction extends Action {
	type: AppTypeKeys.REMOVE_RELAY
	relayId: string
}

export interface UpdateRelayAction extends Action {
	type: AppTypeKeys.UPDATE_RELAY
	relay: Relay
}

export type AppActionTypes =
	| SetModalAction
	| SetErrorAction
	| ClearErrorAction
	| AddRelayAction
	| RemoveRelayAction
	| UpdateRelayAction

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
	addRelay(relay: Relay): AddRelayAction {
		return {
			type: AppTypeKeys.ADD_RELAY,
			relay,
		}
	},
	removeRelay(relayId: string): RemoveRelayAction {
		return {
			type: AppTypeKeys.REMOVE_RELAY,
			relayId,
		}
	},
	updateRelay(relay: Relay): UpdateRelayAction {
		return {
			type: AppTypeKeys.UPDATE_RELAY,
			relay,
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
		case AppTypeKeys.ADD_RELAY:
			return {
				...state,
				relays: [...state.relays, action.relay],
			}
		case AppTypeKeys.REMOVE_RELAY:
			return {
				...state,
				relays: state.relays.filter((relay: Relay) => relay.id !== action.relayId),
			}
		case AppTypeKeys.UPDATE_RELAY: {
			const newRelays = state.relays
			const targetRelay: Relay = newRelays.filter((relay: Relay) => relay.id === action.relay.id)[0]
			targetRelay.address = action.relay.address
			return {
				...state,
				relays: newRelays,
			}
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
