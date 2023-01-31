import { connect, ConnectedProps } from 'react-redux'
import { bindActionCreators, combineReducers } from 'redux'
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import { persistReducer } from 'redux-persist'
import app, { AppState, appActionCreators, AppMiddleware } from './app'
import auth, { authActionCreators, AuthState, AuthMiddleware } from './auth'

export interface RootState {
	app: AppState
	auth: AuthState
}

export const allActionCreators = {
	...appActionCreators,
	...authActionCreators,
}

const persistConfig = {
	key: 'root',
	storage: storageSession,
}

export const connector = connect(
	(state: RootState) => state,
	(dispatch) => ({
		actions: bindActionCreators(allActionCreators, dispatch),
	})
)

export type PageProps = ConnectedProps<typeof connector> & { params?: any }

export const authMiddleware = AuthMiddleware()
export const appMiddleware = AppMiddleware()

const reducer = combineReducers({
	auth,
	app,
})

export const persistedReducer = persistReducer(persistConfig, reducer)
