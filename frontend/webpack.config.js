const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
    favicon: './public/img/favico.ico'
});
const Dotenv = require('dotenv-webpack');
const SentryCliPlugin = require('@sentry/webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css'],
        fallback: {
            "fs": false,
            "os": false,
            "path": false
        },
    },
    plugins: [
        htmlPlugin,
        new Dotenv(),
        // new SentryCliPlugin({
        //     include: '.',
        //     ignoreFile: '.sentrycliignore',
        //     ignore: ['node_modules', 'webpack.config.js'],
        //     configFile: 'sentry.properties',
        //     release: '1.0'
        // }),
    ],
    devServer: {
        hot: true,
        port: 8080,
        historyApiFallback: true,
    },
};