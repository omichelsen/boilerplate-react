const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const { resolve } = require('path')

module.exports = {
	output: {
		path: resolve(__dirname, 'public'),
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
		}),
		new ExtractTextPlugin({ filename: 'styles-[hash:6].css', allChunks: true }),
		new OfflinePlugin({
			caches: {
				main: ['*.html', '*.css', '*.js'],
			},
			safeToUseOptionalCaches: true,
			ServiceWorker: {
				events: true,
				navigateFallbackURL: '/app.html',
			},
			AppCache: {
				events: true,
				FALLBACK: {
					'/polls': '/app.html',
				},
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?importLoaders=1&minimize', 'postcss-loader', 'less-loader'],
				}),
			},
		],
	},
	devtool: 'source-map',
}
