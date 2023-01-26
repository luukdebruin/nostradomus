import { connect, ConnectedProps } from 'react-redux'
import { bindActionCreators, combineReducers } from 'redux'
import app, { AppState, appActionCreators, AppMiddleware } from './app'

export interface RootState {
	app: AppState
}

export const allActionCreators = {
	...appActionCreators,
}

export const connector = connect(
	(state: RootState) => state,
	(dispatch) => ({
		actions: bindActionCreators(allActionCreators, dispatch),
	})
)

export type PageProps = ConnectedProps<typeof connector> & { params?: any }

export const appMiddleware = AppMiddleware()

export default combineReducers({
	app,
})
