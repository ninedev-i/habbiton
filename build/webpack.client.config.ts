const path = require('path');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseCfg = require('./2webpack.base.config');

const config = merge(baseCfg, {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, '../dist/src'),
    },
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
        open: true,
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
    ],
});

module.exports = config;
