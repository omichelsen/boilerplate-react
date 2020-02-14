import * as authActions from './actions'

export const initialState = Object.freeze({
	authPending: true,
})

export default (state: any = initialState, { type } = {} as any) => {
	const merge = (obj: any = {}) => ({ ...state, ...obj })

	switch (type) {
		case String(authActions.updateUser): {
			return merge({ showSignIn: false })
		}
		default:
			return state
	}
}
