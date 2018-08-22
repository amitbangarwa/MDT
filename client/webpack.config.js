const webpack = require('webpack');
const path = require('path');
const parentDir = path.join(__dirname, '/');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: './index.js'
    },
    output: {
        path: path.resolve(__dirname + '/public'),
        filename: './js/[name].bundle.js'
    },
    module: {
        rules: [
            //babel-loader
            {
                test: /\.(js|jsx)$/,
                include: parentDir + 'src/',
                exclude: parentDir + 'node_modules/',
                use: {
                    loader: "babel-loader"
                }
            },
            //html-loader
            {test: /\.html$/, use: ['html-loader']},
            //less-loader
            {
                test: /\.less$/,
                include: [path.resolve(__dirname, 'src', 'styles', 'index.less')],
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            strictMath: true,
                            noIeCompat: true
                        }
                    }]
            },
            //image-loader
            {
                test: /\.(png|jpe?g)/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: parentDir + "raw_images/[name].[ext]",
                        limit: 10000
                    }
                }, {
                    loader: "img-loader"
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['public']),
        /*new MiniCssExtractPlugin({
            path: path.resolve(__dirname + '/public'),
            filename: "./css/[name].css"
        })*/
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./public"),
        compress: true,
        stats: 'errors-only',
        historyApiFallback: true,
        hot: true,
        port: 3000
    }
};