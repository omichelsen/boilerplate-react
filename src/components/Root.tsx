import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'

export default function Root(props: { store: any, history?: any }) {
	return (
		<Provider store={props.store}>
			<Router>
				<Route path="/" component={App} />
			</Router>
		</Provider>
	)
}
