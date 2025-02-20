import webpack, { Configuration, DefinePlugin } from 'webpack'
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {

  const {mode, port, paths, analyzer, platform} = options

  const isDev = mode === 'development'

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({template: paths.html}),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode)
    }),
  ]

  if(isDev) {
    plugins.push(new webpack.ProgressPlugin())
    /** Выносит проверку типов в отдельный процесс, не нагружая сборку */
    plugins.push(new ForkTsCheckerWebpackPlugin())
  }

  if(!isDev) {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }))
  }

  if(analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins
  // return [
  //   new HtmlWebpackPlugin({template: path.resolve(__dirname, "public", "index.html") }),
  //   // медленный
  //   isDev && new webpack.ProgressPlugin(),
  //   !isDev && new MiniCssExtractPlugin()

  // ].filter(Boolean)
}