import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import analytics from './middleware/analytics'
import rootReducer from './reducers'

const middleware = [
	analytics,
	thunkMiddleware,
	promiseMiddleware,
]

if (process.env.NODE_ENV === 'development') {
	const { logger } = require('redux-logger') // tslint:disable-line:no-var-requires
	middleware.push(logger)
}

export default function configureStore(initialState?: any) {
	return createStore(
		rootReducer as any,
		applyMiddleware(...middleware),
		initialState
	)
}
