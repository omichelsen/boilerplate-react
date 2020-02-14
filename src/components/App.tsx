import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Button from './common/Button/Button'

const App = () => (
	<div>
		<h1>Boilerplate for React</h1>
		<Button>I am a button</Button>
	</div>
)

export default function Root() {
	return (
		<Router>
			<Route path="/" component={App} />
		</Router>
	)
}
