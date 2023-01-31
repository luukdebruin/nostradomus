import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Modal from './components/Modal'

function App() {
	return (
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
	)
}

export default App
