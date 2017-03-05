const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');

const PRODUCTION = process.env.NODE_ENV === 'production';

const entry = PRODUCTION
  ? ['./src/index.js']
  : [
    './src/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://dev.localhost:3000',
  ];

const plugins = PRODUCTION ?
[
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: '[name].[hash:12].min.js',
  }),
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    mangle: false,
    compress: {
      warnings: false,
    },
  }),
  new ExtractTextPlugin('styles/styles-[contenthash:10].css'),
  new HTMLWebpackPlugin({
    template: 'index-template.html',
  }),
  new SriPlugin({
    hashFuncNames: ['sha256', 'sha384'],
    enabled: PRODUCTION,
  }),
]
  :
[new webpack.HotModuleReplacementPlugin()];

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION ?
ExtractTextPlugin.extract({
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: true,
        importLoaders: 1,
        localIdentName: cssIdentifier,
      },
    },
    'postcss-loader',
  ],
})
  :
[
  'style-loader',
  `css-loader?importLoaders=1&localIdentName=${cssIdentifier}!sass-loader`,
];


module.exports = {
  entry: {
    app: entry,
    vendor: ['react', 'react-dom', 'mobx'],
  },
  plugins,
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loaders: ['babel-loader'],
      exclude: '/node_modules/',
    }, {
      test: /\.(png|jpg|gif)$/,
      loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
      exclude: '/node_modules/',
    }, {
      test: /\.(css)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 1,
            localIdentName: cssIdentifier,
          },
        },
        'postcss-loader',
      ],
    }],
  },
  output: {
    crossOriginLoading: 'anonymous',
    path: path.join(__dirname, 'dist'),
    publicPath: PRODUCTION ? '/' : '/dist/',
    filename: PRODUCTION ? '[name].[hash:12].min.js' : '[name].js',
  },
};
