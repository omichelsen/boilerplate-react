import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import configureStore from './redux/store'
import './styles/index.less'

const store = configureStore()

if (process.env.NODE_ENV === 'production') {
	import('./services/offline').then((offline) => offline.init())
}

const Root = hot(module)(App)

render(
	<Provider store={store}>
		<BrowserRouter>
			<Root />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
