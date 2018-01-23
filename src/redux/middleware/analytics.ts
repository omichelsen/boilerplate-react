const nonInteraction = true

export default (store: any) => (next: any) => (action: any) => {
	switch (action.type) {
		case 'USER_UPDATED':
		default:
			break
	}

	return next(action)
}
