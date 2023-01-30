import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { NostrProvider } from 'nostr-react'
import store from './redux/store'
import './global.css'
import App from './App'

const relayUrls = [
	'wss://nostr-pub.wellorder.net',
	'wss://relay.nostr.ch',
	'wss://nostr-relay.alekberg.net',
	'wss://nostr.bitcoiner.social',
	'wss://nostr.openchain.fr',
	'wss://nostr.zebedee.cloud',
	'wss://nostr.chaker.net',
	'wss://relay.cryptocculture.com',
	'wss://nostr.coollamer.com',
	'wss://relay.nostrich.de',
	'wss://no-str.org',
	'wss://relay.nostr.scot',
	'wss://jiggytom.ddns.net',
	'/wss://nostr.nodeofsven.com',
	'wss://nostr.drss.io',
	'wss://relay.damus.io',
	'wss://nostr.p2sh.co',
	'wss://nostr.yael.at',
	'wss://relay.taxi',
]

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<NostrProvider relayUrls={relayUrls} debug={true}>
			<App />
		</NostrProvider>
	</Provider>
)
