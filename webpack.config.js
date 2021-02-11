const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: "guideJs",
        libraryExport: 'default', 
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@": path.resolve(__dirname, "../src"),
            pages: path.resolve(__dirname, "../src/pages"),
            router: path.resolve(__dirname, "../src/router")
        }
    },
    module: {
        rules: [
            {
                // cnpm i babel-loader @babel/core @babel/preset-env -D
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(sc|sa|c|le)ss$/,
                use: [
                    'style-loader',
                    "css-loader", // 编译css
                    // "postcss-loader", // 使用 postcss 为 css 加上浏览器前缀
                    "less-loader" // 编译less
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                    loader: "url-loader",
                    options: {
                        outputPath: "images/", // 图片输出的路径
                        limit: 10 * 1024
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: 'fonts/',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            filename: "index.html", // 最终创建的文件名
            template: "./src/index.html", // 指定模板路径
            inject:'head'
        })
    ],
    devtool:'cheap-module-eval-source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, "../dist"),
        host: "localhost", // 可以使用手机访问
        port: 3000,
        historyApiFallback: true, //  该选项的作用所有的404都连接到index.html
        proxy: {
            // 代理到后端的服务地址
            "/api": "http://localhost:3000"
        }
    }
};