const {ProgressPlugin, DefinePlugin} = require('webpack');
const {join} = require('path');

const baseConfig = {
    context: join(__dirname, '../'),
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    mode: process.env.NODE_ENV || 'development',
    target: ['web', 'es2017'],
    performance: {
        hints: false,
    },
    optimization: {
        minimize: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: (module: any) => {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    plugins: [
        new ProgressPlugin({
            percentBy: 'entries',
        }),
        new DefinePlugin({
            IS_PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production'),
        }),
    ],
};

module.exports = baseConfig;
