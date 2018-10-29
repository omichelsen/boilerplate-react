/* tslint:disable: no-implicit-dependencies */
export const init = () => {
	import('offline-plugin/runtime').then((offline) => {
		offline.install({
			onUpdateReady: () => offline.applyUpdate(),
			onUpdated: () => window.location.reload(),
		})
	})
}
