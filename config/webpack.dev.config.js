const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './js/app.js',
    './css/style.scss', './css/variables.scss',
  ],
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/app.bundle.js',
  },
  module: {
    rules: [
      {
        // Process JavaScript with babel
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader', // translates CSS into CommonJS
            }, {
              loader: 'postcss-loader', // only for autoprefixing
              options: {
                config: {
                  path: 'config/postcss.config.js',
                },
              },
            }, {
              loader: 'sass-loader', // compiles Sass to CSS
            }],
        }),
      },
    ],
  },
  plugins: [
    // Extract scss files to 'css/style.css'
    new ExtractTextPlugin('css/style.css'),
    // Copy static files to dist
    new CopyWebpackPlugin([
      { from: './static', to: './' },
    ]),
  ],
};
