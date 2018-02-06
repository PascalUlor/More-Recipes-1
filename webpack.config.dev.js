const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.config.common');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = merge(common, {
  devtool: 'cheap-module-eval',
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
    HtmlWebpackPluginConfig,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ]
});
