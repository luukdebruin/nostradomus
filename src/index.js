import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { NostrProvider } from 'nostr-react'
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import './global.css'
import App from './App'
import { relayUrls } from 'src/nostr/relay'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<NostrProvider relayUrls={relayUrls} debug={true}>
				<App />
			</NostrProvider>
		</PersistGate>
	</Provider>
)
