import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import './styles/index.less'

if (process.env.NODE_ENV === 'production') {
	const offline = require('offline-plugin/runtime') // tslint:disable-line:no-var-requires
	offline.install({
		onUpdateReady: () => offline.applyUpdate(),
		onUpdated: () => window.location.reload(),
	})
}

ReactDOM.render(
	<AppContainer>
		<App />
	</AppContainer>,
	document.getElementById('root')
)

if (module.hot) {
	module.hot.accept('./components/App', () => {
		const NextApp = require('./components/App').default
		ReactDOM.render(
			<AppContainer>
				<NextApp />
			</AppContainer>,
			document.getElementById('root')
		)
	})
}
