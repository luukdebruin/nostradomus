import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Modal from './components/Modal'
// import { NostrProvider } from 'nostr-react'
// import { useAppSelector } from './redux/hooks'

function App() {
	// const relays = useAppSelector((state) => state.app.relays)

	// const relayUrls = useMemo(() => {
	// 	const urls = relays
	// 		.filter((relay: Relay) => relay.active)
	// 		.map((relay: Relay) => {
	// 			return relay.address
	// 		})
	// 	return urls
	// }, [relays])

	return (
		// <NostrProvider relayUrls={fallbackRelays} debug={false}>
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
		// </NostrProvider>
	)
}

export default App
