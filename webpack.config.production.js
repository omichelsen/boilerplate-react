const OfflinePlugin = require('offline-plugin')
const { resolve } = require('path')

module.exports = {
	output: {
		filename: '[name]-[chunkhash:6].js',
		path: resolve(__dirname, 'public'),
		publicPath: '/',
	},
	plugins: [
		new OfflinePlugin({
			caches: {
				main: ['*.html', '*.css', '*.js'],
			},
			safeToUseOptionalCaches: true,
			ServiceWorker: {
				events: true,
			},
			AppCache: {
				events: true,
			},
		}),
	],
	devtool: 'source-map',
}
