import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import * as authActions from '../actions/auth'
import app from './app'

const appReducer = combineReducers({
	app,
})

export default (state: any, action: any) => {
	if (action.type === authActions.updateUser.toString()) {
		return appReducer(undefined as any, action)
	}

	return appReducer(state, action)
}
