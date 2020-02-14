/* eslint-disable global-require */
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OfflinePlugin = require('offline-plugin')
const { resolve } = require('path')
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = (_, { mode: env = 'development' }) => {
	const plugins = []
	if (env !== 'development') {
		plugins.push(
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
			})
		)
	}

	return {
		entry: {
			index: './src/entry.index.tsx',
		},
		output: {
			filename: env === 'development' ? '[name].js' : '[name]-[chunkhash:6].js',
			path: env === 'development' ? resolve(__dirname, 'src') : resolve(__dirname, 'public'),
			publicPath: '/',
		},
		resolve: {
			extensions: ['.js', '.json', '.ts', '.tsx'],
		},
		module: {
			rules: [
				{ test: /\.tsx?$/, loader: 'ts-loader' },
				{
					test: /\.(gif|ico|jpg|png)$/,
					use: ['file-loader?name=img/[name]-[hash:6].[ext]'],
				},
				{
					test: /\.svg$/,
					use: ['svg-inline-loader?name=img/[name]-[hash:6].[ext]'],
				},
				{
					test: /\.woff2$/,
					use: ['url-loader?limit=8192&name=[name]-[hash:6].[ext]'],
				},
				{
					test: /\.less$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: env === 'development',
							},
						},
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: {
									localIdentName: env === 'development' ? '[name]_[local]' : '[hash:base64]',
								},
								sourceMap: env === 'development',
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: env === 'development',
								plugins: [require('autoprefixer')(), require('cssnano')()],
							},
						},
						{
							loader: 'less-loader',
							options: {
								sourceMap: env === 'development',
							},
						},
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: env === 'development' ? '[name].css' : '[name]-[chunkhash:6].css',
			}),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: './src/index.ejs',
			}),
			new WebpackPwaManifest(require('./src/manifest.json')),
			new CopyPlugin([{ from: 'src/robots.txt' }]),
			...plugins,
		],
		devServer: {
			contentBase: resolve(__dirname, 'src'),
			historyApiFallback: true,
			host: '0.0.0.0',
			publicPath: '/',
		},
		devtool: env === 'development' ? 'inline-source-map' : 'source-map',
	}
}
