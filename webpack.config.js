/* eslint-disable global-require */
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const config = require('./config')

module.exports = (env = 'development') => {
	// eslint-disable-next-line import/no-dynamic-require
	const envConfig = require(`./webpack.config.${env}`)

	const makeEntry = (entry) => {
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
			index: makeEntry('./src/entry.index.tsx'),
		},
		output: {
			filename: '[name].js',
			path: resolve(__dirname, 'src'),
			publicPath: '/',
		},
		resolve: {
			extensions: ['.js', '.json', '.ts', '.tsx'],
		},
		module: {
			rules: [
				{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
				{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
				{ test: /\.(gif|ico|jpg|png|svg)$/, use: ['url-loader?limit=3192&name=img/[name]-[hash:6].[ext]'] },
				{ test: /\.pug$/, use: ['pug-loader'] },
				{ test: /manifest\.json$/, use: ['file-loader?name=[name]-[hash:6].[ext]', 'web-app-manifest-loader'] },
				{ test: /\.less$/, use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'less-loader'] },
			],
		},
		plugins: [
			new HtmlWebpackPlugin({ filename: 'index.html', template: './src/templates/index.pug' }),
			new webpack.DefinePlugin({
				'process.config': JSON.stringify(config[env]),
				'process.env': {
					NODE_ENV: JSON.stringify(env),
				},
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
		],
		devServer: {
			contentBase: resolve(__dirname, 'src'),
			historyApiFallback: { index: '/index.html' },
			hot: true,
			publicPath: '/',
		},
		devtool: 'inline-source-map',
	}, envConfig)
}
