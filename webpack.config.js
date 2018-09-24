var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: isDev() ? 'development' : 'production',
    entry: {
        app: [
            // path.resolve('babel-polyfill'),
            __dirname + '\\src\\app.js',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: isDev() ? '[name].[hash].js' : '[name].js',
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        compress: true,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        hot: true,
        disableHostCheck: true,
    },
    module: {
        rules: [
            {
                test: /.js|jsx/,
                include: /src/,
                exclude:[/node_modules/, /[\\\/]src[\\\/]assets/],
                loader: 'babel-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '\\src\\assets\\\index.ejs',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        // modules: ['src', 'node_modules'],
        extensions: ['.jsx', 'js', '.css'],
    },
}

function isDev() {
    return process.env.NODE_ENV = 'development';
}

function isProd() {
    return process.env.NODE_ENV = 'production';
}