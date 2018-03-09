const path = require('path');
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
      // {
      //   // Proccess CSS - uses ExtractTextPlugin to extract css to separate file
      //   // and postcss-loader to for autoprefixing
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     use: [
      //       {
      //         loader: 'css-loader',
      //       }, {
      //         loader: 'postcss-loader',
      //         options: {
      //           config: {
      //             path: 'config/postcss.config.js',
      //           },
      //         },
      //       }, {
      //         loader: 'sass-loader',
      //       }],
      //   }),
      // },
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
    // Extract SCSS to css/style.css
    // new ExtractTextPlugin('css/style.css'),
    // Copy static files to dist
    new CopyWebpackPlugin([
      { from: './static', to: './' },
    ]),
  ],
};
