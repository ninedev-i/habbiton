const path = require('path');
const {merge} = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const cfg = require('./webpack.base.config');

const config = merge(cfg, {
    entry: './service/index.ts',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist/server'),
    },
    target: ['node'],
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, '../service/tsconfig.server.json'),
                    },
                }],
            },
        ],
    },
    performance: {
        hints: false,
    },
});

module.exports = config;
