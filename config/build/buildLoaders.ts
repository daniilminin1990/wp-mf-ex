import { ModuleOptions } from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

  const isDev = options.mode === 'development'

  const cssLoaderWithModules = {
      loader: "css-loader",
      options: {
        modules: {
          localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]"
        },
      }
    }

  const scssLoaders = {
      test: /\.s[ac]ss$/i,
      use: [
        // 'style-loader', // создает 'style' ноды из строк JS
        isDev ? 'style-loader' :MiniCssExtractPlugin.loader,
        // 'css-loader', // переводит CSS в commonJS
        cssLoaderWithModules,
        'sass-loader' // компилирует sass в css
      ]
    }
  const tsLoaders = {
    // ts-loader умеет работать с JSX
    // Если бы мы не использовали TS, то нужен был бы babel-loader
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  }

  // const tsLoaders = {
  //   // ts-loader умеет работать с JSX
  //   // Если бы мы не использовали TS, то нужен был бы babel-loader
  //   test: /\.tsx?$/,
  //   use: {
  //     loader: 'ts-loader',
  //     options: {
  //       transpileOnly: true
  //     }
  //   },
  //   exclude: /node_modules/,
  // }

  const assetLoader = {
    // test: /\.(png|svg|jpg|jpeg|gif)$/i,
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeAttrs: { attrs: ['fill', 'stroke'] } // Удаляет fill и stroke
                  }
                }
              }
            ]
          }
        }
      }
    ]
  };

  return [
    assetLoader,
    scssLoaders,
    tsLoaders,
    svgrLoader
  ]
}