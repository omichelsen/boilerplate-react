import { combineReducers } from 'redux'
import * as appActions from './app/actions'
import app from './app/reducer'

const appReducer = combineReducers({
	app,
})

export default (state: any, action: any) => {
	if (action.type === appActions.updateUser.toString()) {
		return appReducer(undefined as any, action)
	}

	return appReducer(state, action)
}
