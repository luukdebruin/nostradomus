import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'
import { appMiddleware, authMiddleware, persistedReducer } from './index'

function configureStore() {
	const store = createStore(
		persistedReducer,
		applyMiddleware(
			appMiddleware,
			authMiddleware,
			createLogger({
				diff: true,
			})
		)
	)
	return store
}

const store = configureStore()
export const persistor = persistStore(store)
export default store
