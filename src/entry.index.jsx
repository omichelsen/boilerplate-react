import offline from 'offline-plugin/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import './styles/main.less'
import './styles/index.less'

if (process.env.NODE_ENV === 'production') {
	offline.install({
		onUpdateReady: () => offline.applyUpdate(),
		onUpdated: () => window.location.reload(),
	})
}

ReactDOM.render(
	<AppContainer>
		<App compiler="TypeScript" framework="React" />
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
