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
  new ExtractTextPlugin({ filename: 'styles/[name]-[contenthash:10].css', allChunks: true }),
  new HTMLWebpackPlugin({
    template: 'index-template.html',
  }),
  new SriPlugin({
    hashFuncNames: ['sha256', 'sha384'],
    enabled: PRODUCTION,
  }),
]
  :
[
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION ?
{
  test: /\.(css)$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: true,
        importLoaders: 1,
        localIdentName: cssIdentifier,
        cacheDirectory: true,
      },
    },
      'postcss-loader', // has separate config nearby
    ],
  }),
}
  :
{
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
        cacheDirectory: true,
      },
    },
    'postcss-loader',
  ],
};


module.exports = {
  entry: {
    app: entry,
    vendor: ['react', 'react-dom', 'mobx', 'mobx-react', 'react-router-dom', 'react-toolbox'],
  },
  plugins,
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      exclude: '/node_modules/',
    }, {
      test: /\.(png|jpg|gif)$/,
      loaders: ['url-loader?limit=10000&name=images/[hash:12].[ext]'],
      exclude: '/node_modules/',
    },
      cssLoader,
    ],
  },
  output: {
    crossOriginLoading: 'anonymous',
    path: path.join(__dirname, 'dist'),
    publicPath: PRODUCTION ? '/' : '/dist/',
    filename: PRODUCTION ? '[name].[hash:12].min.js' : '[name].js',
  },
};
