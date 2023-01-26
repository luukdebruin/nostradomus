import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import reducers, { appMiddleware } from './index'

function configureStore() {
	const store = createStore(
		reducers,
		applyMiddleware(
			appMiddleware,
			createLogger({
				diff: false,
			})
		)
	)
	return store
}

const store = configureStore()
export default store
