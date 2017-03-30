var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		filename: 'public/dist/bundle.js',
		sourceMapFilename: 'public/dist/bundle.map.js'
	},
	devtool: '#source-map',
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				test: /\.js?$/,
				exclude: /(node_modules)/,
				query: {
					presets: ["es2015", "react", "stage-0"]
				}
			}
		]
	}
}