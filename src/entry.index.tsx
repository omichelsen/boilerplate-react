import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './components/Root'
import configureStore from './redux/store'
import './styles/index.less'

const store = configureStore()

if (process.env.NODE_ENV === 'production') {
	import('./services/offline').then((offline) => offline.init())
}

const compose = (Component: any) => (
	<AppContainer key={Math.random()}>
		<Component store={store} />
	</AppContainer>
)

const render = (Component: any) => {
	ReactDOM.render(
		compose(Component),
		document.getElementById('root')
	)
}

render(Root)

if (module.hot) {
	module.hot.accept('./components/Root', () => {
		const NextApp = require('./components/Root').default
		render(NextApp)
	})
}
