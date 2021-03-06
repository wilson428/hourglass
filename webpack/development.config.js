const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./base.config');

module.exports = merge(base, {
	output: {
		filename: "hourglass.js"
	},
	devtool: 'inline-source-map'
});