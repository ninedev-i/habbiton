const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const publicPath = argv.mode === 'production' ? './' : '/';

    return {
        entry: path.resolve(__dirname, './src/index.tsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            publicPath,
        },
        target: ['web', 'es2017'],
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.less'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/',
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
            minimize: true,
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
            new webpack.DefinePlugin({
                IS_PRODUCTION: JSON.stringify(argv.mode === 'production'),
            }),
        ],
    };
};
