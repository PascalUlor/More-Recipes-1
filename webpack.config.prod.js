const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./webpack.config.common');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true
  }
});

const webpackoptimizeUglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  compressor: {
    warnings: false,
    screw_ie8: true,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true
  },
  output: {
    comments: false
  }
});

module.exports = merge(common, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    path.join(__dirname, '/client/Index.jsx')
  ],
  module: {
    rules: [
      {
        test: /\.(js?x)$/,
        use: 'babel-loader',
        include: path.join(__dirname, '/client'),
        exclude: /(node_modules|.vscode)/
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    webpackoptimizeUglifyJsPluginConfig,
    new webpack.HashedModuleIdsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ]
});
