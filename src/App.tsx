import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'

const Home = () => {
	return <div>Hola Mundo</div>
}

function App() {
	return (
		<Router>
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
