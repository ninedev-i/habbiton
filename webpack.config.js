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
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: ['babel-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.png$/,
                    use: [
                        {loader: 'file-loader',
                            options: {name: '[name].[ext]', outputPath: 'static/assets/', publicPath: 'static/assets/'},
                        },
                    ],
                    exclude: /node_modules/,
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
                template: './src/index.html',
                filename: './index.html',
                favicon: './src/favicon.png',
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
