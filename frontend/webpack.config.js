const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
    favicon: './public/img/favico.ico'
});
const Dotenv = require('dotenv-webpack');

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
        new Dotenv()
    ],
    devServer: {
        hot: true,
        port: 8080,
        historyApiFallback: true,
    },
};