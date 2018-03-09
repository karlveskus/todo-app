const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './js/app.js',
    './css/style.scss', './css/variables.scss',
  ],
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
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          }, {
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
      },
    ],
  },
  plugins: [
    // Minify and uglify code
    new UglifyJsPlugin(),
    // Copy static files to dist
    new CopyWebpackPlugin([
      { from: './static', to: './' },
    ]),
  ],
};
