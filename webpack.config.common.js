const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(mp3)$/,
        loader: 'file-loader?name=sounds/[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./css/styles.css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    new Dotenv({
      path: './.env', // Path to .env file
      systemvars: true // load all system variables
                       // as well (useful for CI purposes)
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  }
};
