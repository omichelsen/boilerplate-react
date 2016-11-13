/* eslint-disable global-require */
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const config = require('./config')

module.exports = (env = 'development') => {
	// eslint-disable-next-line import/no-dynamic-require
	const envConfig = require(`./webpack.config.${env}`)

	function makeEntry(entry) {
		if (env === 'development') {
			return [
				'react-hot-loader/patch',
				'webpack-dev-server/client?http://localhost:8080',
				'webpack/hot/only-dev-server',
				entry,
			]
		}
		return [entry]
	}

	return webpackMerge({
		entry: {
			app: makeEntry('./src/entry.app.jsx'),
			index: makeEntry('./src/entry.index.jsx'),
		},
		output: {
			path: resolve(__dirname, 'src'),
			filename: '[name]-[chunkhash].js',
			publicPath: '/',
		},
		resolve: {
			extensions: ['.js', '.jsx'],
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [['env', { modules: false }], 'react'],
							plugins: [require('babel-plugin-transform-object-rest-spread')],
						},
					},
				},
				{ test: /\.(gif|ico|jpg|png|svg)$/, use: ['url-loader?limit=3192&name=img/[name]-[hash:6].[ext]'] },
				{ test: /\.pug$/, use: ['pug-loader'] },
				{ test: /manifest\.json$/, use: ['file-loader?name=[name]-[hash:6].[ext]', 'web-app-manifest-loader'] },
				{ test: /\.less$/, use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'less-loader'] },
			],
		},
		plugins: [
			new CommonsChunkPlugin({
				filename: 'common-[hash].js',
				minChunks: (module) => {
					// This prevents stylesheet resources with the .css or .less extension
					// from being moved from their original chunk to the vendor chunk
					// Ref: https://webpack.js.org/plugins/commons-chunk-plugin/#passing-the-minchunks-property-a-function
					if (module.resource && (/^.*\.(css|less)$/).test(module.resource)) {
						return false
					}
					return module.context && module.context.indexOf('node_modules') !== -1
				},
				name: 'common',
			}),
			new HtmlWebpackPlugin({ filename: 'app.html', template: './src/pages/index.pug', chunks: ['common', 'app'] }),
			new HtmlWebpackPlugin({ filename: 'index.html', template: './src/pages/index.pug', chunks: ['common', 'index'] }),
			new webpack.DefinePlugin({
				'process.config': JSON.stringify(config[env]),
				'process.env': {
					NODE_ENV: JSON.stringify(env),
				},
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
		],
		devServer: {
			contentBase: resolve(__dirname, '..', 'src'),
			historyApiFallback: { index: '/index.html' },
			hot: true,
			publicPath: '/',
		},
		devtool: 'inline-source-map',
	}, envConfig)
}
