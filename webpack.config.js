const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path')
const config = require('./config')

module.exports = (_, { mode: env = 'development' }) => webpackMerge({
	entry: {
		index: './src/entry.index.tsx',
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
			{ test: /\.tsx?$/, loader: 'ts-loader' },
			{ test: /\.(gif|ico|jpg|png|svg)$/, use: ['url-loader?limit=3192&name=img/[name]-[hash:6].[ext]'] },
			{ test: /manifest\.json$/, use: ['file-loader?name=[name]-[hash:6].[ext]', 'web-app-manifest-loader'] },
			{ test: /\.woff2$/, use: ['url-loader?limit=8192&name=[name]-[hash:6].[ext]'] },
			{
				test: /\.less$/,
				use: [
					env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
					'typings-for-css-modules-loader?importLoaders=1&modules&namedExport&camelCase&minimize&silent',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: env !== 'production',
							plugins: () => [require('autoprefixer')()],
						},
					},
					{
						loader: 'less-loader',
						options: { sourceMap: env !== 'production' },
					}
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: env === 'development' ? '[name].css' : '[name]-[chunkhash:6].css',
		}),
		new HtmlWebpackPlugin({ filename: 'index.html', template: './src/index.ejs' }),
		new webpack.DefinePlugin({
			'process.config': JSON.stringify(config[env]),
		}),
		new webpack.WatchIgnorePlugin([/\.less\.d\.ts$/]),
	],
	devServer: {
		contentBase: resolve(__dirname, 'src'),
		publicPath: '/',
	},
	devtool: 'inline-source-map',
}, env === 'production' ? require(`./webpack.config.production`) : {})
