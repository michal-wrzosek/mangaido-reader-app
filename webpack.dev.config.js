var webpack = require('webpack');
var path = require("path");

module.exports = {
  devtool: 'inline-source-map',
  entry: './entries/reader.jsx',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
               configFile: './.eslintrc',
            }
          },
        ],
      },
      {
        test: /\.scss$/,
        // include: path.join(__dirname, 'src'),
        use: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 2,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              data: '@import "app";',
              includePaths: [
                path.resolve(__dirname, './src'),
              ],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve('../../../public/reader'),
    publicPath: '/',
    filename: 'reader.js',
  },
};
