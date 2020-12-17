const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[contenthash].js',
    },
    resolve: {
        alias: {
            // '~': path.resolve(__dirname, './src/'),
            // _: [path.resolve(__dirname, 'src/')],
            '~': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.less'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
                    {loader: 'less-loader', options: {sourceMap: true}},
                ],
            },
        ],
    },
    devServer: {
        overlay: true,
        historyApiFallback: true,
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: (module) => {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Welcome to sivaraj-v github ',
            template: './src/index.html',
            filename: './index.html',
            meta: {
                viewport: 'width=device-width, initial-scale=1.0',
                charset: 'UTF-8',
            },
        }),
        new webpack.ProgressPlugin({
            percentBy: 'entries',
        }),
    ],
};
