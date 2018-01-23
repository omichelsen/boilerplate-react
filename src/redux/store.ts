import { applyMiddleware, createStore } from 'redux'
import * as promise from 'redux-promise'
import thunk from 'redux-thunk'
import analytics from './middleware/analytics'
import rootReducer from './reducers'

const middleware = [thunk, promise, analytics]

if (process.env.NODE_ENV === 'development') {
	// tslint:disable-next-line:no-var-requires
	const { logger } = require('redux-logger')
	middleware.push(logger)
}

export default function configureStore(initialState?: any) {
	return createStore(
		rootReducer,
		applyMiddleware(...middleware),
		initialState
	)
}
