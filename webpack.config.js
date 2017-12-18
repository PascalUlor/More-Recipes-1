const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '/client/index.jsx')
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.min.js'
  },
  module: {
    rules: [{
        test: /\.(js?x)$/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
        include: path.join(__dirname, 'client'),
        exclude: /(node_modules|server|.vscode)/
      },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
    new Dotenv({
      path: './.env', // Path to .env file
      systemvars: true // load all system variables as well (useful for CI purposes)
    })
  ],
  node: {
    dns: 'empty',
    net: 'empty'
  },
  resolve: {
    extensions: ['.jsx', '.js']
  }
};
