var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var SriPlugin = require('webpack-subresource-integrity');

var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';

var entry = PRODUCTION
  ? ['./src/index.js']
  : [
    './src/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://dev.localhost:3000'
  ];

var plugins = PRODUCTION
  ? [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: '[name].[hash:12].min.js',
      }),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        mangle: false,
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin('styles-[contenthash:10].css'),
      new HTMLWebpackPlugin({
        template: 'index-template.html'
      }),
      new SriPlugin({
        hashFuncNames: ['sha256', 'sha384'],
        enabled: PRODUCTION,
        crossorigin: 'anonymous',
      })
    ]
  : [new webpack.HotModuleReplacementPlugin()];

plugins.push(
 new webpack.DefinePlugin({
  DEVELOPMENT: JSON.stringify(DEVELOPMENT),
  PRODUCTION: JSON.stringify(PRODUCTION)
 })
);

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION
  ? ExtractTextPlugin.extract({
      loader: 'css-loader?importLoaders=1&localIdentName=' + cssIdentifier + '!postcss-loader'
    })
  :  ['style-loader', 'css-loader?importLoaders=1&localIdentName=' + cssIdentifier + '!postcss-loader'];

ExtractTextPlugin.extract({
          loader: 'css-loader?importLoaders=1!postcss-loader'
        })

module.exports = {
  entry: {
    app: entry,
    vendor: ['react', 'react-dom', 'mobx'],
  },
  plugins: plugins,
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loaders: ['babel-loader'],
      exclude: '/node_modules/'
    }, {
      test: /\.(png|jpg|gif)$/,
      loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
      exclude: '/node_modules/'
    }, {
      test: /\.css$/,
      loaders: cssLoader,
      exclude: '/node_modules/'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: PRODUCTION ? '/' : '/dist/',
    filename: PRODUCTION ? '[name].[hash:12].min.js' : '[name].js'
  }
};
