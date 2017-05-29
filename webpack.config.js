const path = require('path')

const config = {
	entry: path.resolve(__dirname, 'src') + '/index.js',
	output: {
		path: path.resolve(__dirname, 'js/'),
		filename: 'app.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader'
			}
		]
	},
	resolve: {
		modules: [
			path.resolve(__dirname, 'src'),
			'node_modules'
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		publicPath: '/js',
		port: 9000,
		historyApiFallback: true
	}
}

module.exports = config
