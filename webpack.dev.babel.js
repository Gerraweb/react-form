import { merge } from 'webpack-merge'
import path from 'path'
import ESLintPlugin from 'eslint-webpack-plugin'
import common from './webpack.common.babel.js'

module.exports = merge(common, {
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
      watch: true,
    },
    historyApiFallback: true,
    hot: true,
  },
  devtool: 'eval-source-map',
  plugins: [new ESLintPlugin({
    context: './src',
    emitError: true,
    emitWarning: true,
    failOnError: true,
    extensions: ["ts", "tsx"]
  })],
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react', '@babel/preset-typescript'],
          },
        },
        exclude: [/node_modules/, /public/],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(css|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: [/node_modules/, /public/],
      },
    ],
  },
})
