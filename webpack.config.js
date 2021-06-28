const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    target: `web`,
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './../',
                        },
                    },
                    {
                        loader: `css-loader`,
                    },
                    {
                        loader: `sass-loader`,
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]'
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            }
        ]
    },
    devServer: {
        port: 9000,
        contentBase: path.join(__dirname, `src`),
        watchContentBase: true,
        hot: true,
        inline: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `css/style.css`
        }),
        new HtmlWebpackPlugin({
            filename: `index.html`,
            template: `src/index.html`
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, 'src/img'),
                    to: path.join(__dirname, 'img'),
                    noErrorOnMissing: true
                },
            ]
        }),
    ]
};