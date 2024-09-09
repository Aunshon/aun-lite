const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const isProduction = process.env.NODE_ENV === 'production';

const config = {
	...defaultConfig,
	entry: {
		main:"./src/index.js",
	},
};

if ( ! isProduction ) {
	config.devServer = {
		devMiddleware: {
			writeToDisk: true,
		},
		allowedHosts: 'all',
		host: 'localhost',
		port: 8887,
		proxy: {
			'/build': {
				pathRewrite: {
					'^/build': '',
				},
			},
		},

	};
}

module.exports = config;



