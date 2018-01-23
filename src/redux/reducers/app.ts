import { handleActions } from 'redux-actions'
import * as authActions from '../actions/auth'

export const defaultState = Object.freeze({
	authPending: true,
})

export default handleActions({
	[authActions.updateUser.toString()]: (state) => ({ ...state, showSignIn: false }),
}, defaultState)
