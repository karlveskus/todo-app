const path = require('path');

module.exports = {
  entry: ['./js/helpers.js', './js/model.js', './js/view.js', './js/app.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
};
