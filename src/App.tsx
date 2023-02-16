import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Modal from './components/Modal'
import { NostrProvider } from 'nostr-react'
import { useAppSelector } from './redux/hooks'

function App() {
	const relays = useAppSelector((state) => state.app.relays)
	const relayAddresses = relays.map((relay) => {
		return relay.address
	})

	return (
		<NostrProvider relayUrls={relayAddresses} debug={true}>
			<Router>
				<Modal />
				<Layout>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/messages" component={Home} />
						<Route exact path="/notifications" component={Home} />
						<Route exact path="/settings" component={Home} />
						<Route path="/login" component={Home} />
					</Switch>
				</Layout>
			</Router>
		</NostrProvider>
	)
}

export default App
