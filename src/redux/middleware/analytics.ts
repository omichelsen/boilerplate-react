export default () => (next: any) => (action: any) => {
	switch (action.type) {
		case 'USER_UPDATED':
		default:
			break
	}

	return next(action)
}
