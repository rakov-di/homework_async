const path = require('path');
const rootPath = path.resolve(__dirname);

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const buildMode = process.env.NODE_ENV || 'production';

module.exports = {
  mode: buildMode,
  output: {
    path: path.resolve(rootPath + '/build'),
    filename: '[name].js'
  },
  optimization: {
    minimizer: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new UglifyJsPlugin({
        minify(file) {
          const uglifyJsOptions = {};
          return require('terser').minify(file, uglifyJsOptions);
        }
      })
    ]
  },
  devtool: buildMode === 'development' ? 'inline-source-map' : false,
  name: 'forum',
  context: path.resolve(rootPath + '/src'),
  entry: {
    'reduce': './js/reduce.js',
    'checkReduce': './js/checkReduce.js',
    'reduceSync': './js/reduceSync.js',
    'checkReduceSync': './js/checkReduceSync.js',
    'shri-async-hw': './js/shri-async-hw.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'pages/**/*', to: '[name].[ext]' }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                exclude: [
                  '@babel/plugin-transform-classes'
                ],
                targets: '> 0.5%, last 2 versions, not dead',
                useBuiltIns: 'usage',
                corejs: '3.6.4'
              }]
            ]
          }
        }
      }
    ]
  }
};
