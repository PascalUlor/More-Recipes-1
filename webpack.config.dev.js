const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.config.common');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = merge(common, {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '/client/Index.jsx')
  ],
  module: {
    rules: [{
        test: /\.(js?x)$/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
        include: path.join(__dirname, '/client'),
        exclude: /(node_modules|server|.vscode)/
      }]
  },
  plugins: [
    HtmlWebpackPluginConfig
  ]
});
