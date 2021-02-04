const path = require('path');
const {merge} = require('webpack-merge');
const cfg = require('./2webpack.base.config');

const config = merge(cfg, {
    entry: './service/server.ts',
    output: {
        path: path.resolve(__dirname, '../dist/server'),
    },
    target: ['web', 'es2017'],
    externals: {
        express: 'express',
    },
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
