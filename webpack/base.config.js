const webpack = require('webpack');
const autoprefixer = require('autoprefixer')

module.exports = {
	entry: ["babel-polyfill", "./index.js"],
	output: {
		path: __dirname + "/../dist/",
		library: "hourglass",
		libraryTarget: "window"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: {
					presets: [ [ 'env', { modules: false, loose: true	} ] ]
				}
			},
			{
				test: /\.scss$/,
				loaders: [
					'style-loader', 'css-loader', 'sass-loader',
					{ loader: 'postcss-loader', options: { plugins: () => [autoprefixer] } }
				]
			},
			{
				test: /\.(html|ejs)$/, 
				loaders: [ 'ejs-loader' ]
			}
		]
	}
};