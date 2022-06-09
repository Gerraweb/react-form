import webpack from "webpack";
import { merge } from "webpack-merge";
const common = require("./webpack.common.babel.js");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

import config from "./etc/config.prod.js";

module.exports = merge(common, {
  devtool: "cheap-module-source-map",
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            inline: false
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      __config: JSON.stringify(config)
    }),
    new CompressionPlugin({
      filename: "[path][base].gz[query]",
      algorithm: "gzip",
      test: /\.js(\?.*)?$/i,
      threshold: 0,
      minRatio: 1
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react", "@babel/preset-typescript"]
          }
        },
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: [/node_modules/, /public/],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  }
});
