/**
 * @file: webpack.base.conf.
 * @intro: webpack打包基类.
 * @author: zhouzhiming.
 * @email: zhouzhiming@pkebu.com.
 * @Date: 2018/10/11 15:30.
 * @Copyright(©) 2018 by pkebu.
 *
 */
require('./check-versions')()

const path = require('path')
const webpack = require('webpack')
const MinaEntryPlugin = require('@tinajs/mina-entry-webpack-plugin')
const MinaRuntimePlugin = require('@tinajs/mina-runtime-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cssLoaders = require('./cssLoaders')
const config = require('../config')
const buildEnv = require('../config/prod.env')
const devEnv = require('../config/dev.env')

const NODE_ENV = process.env.NODE_ENV
const isProduction = NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, '..', dir)
const cssLoadersObject = cssLoaders(isProduction ? config.build.cssSourceMap : config.dev.cssSourceMap)
const assetsPath = p => path.posix.join(config.assetsSubDirectory, p)
const loaders = {
  script: 'babel-loader',
  style: cssLoadersObject.postcss
}

const createLintingRule = () => ({
  test: /\.(js)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  mode: NODE_ENV,
  devtool: isProduction ? config.build.devtool : config.dev.devtool,
  context: resolve('src'),
  entry: resolve('src/app.mina'),
  output: {
    path: config.assetsRoot,
    filename: '[name]',
    publicPath: '/',
    jsonpFunction: '_FUNC_',
    globalObject: 'wx'
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      ...[{
        test: /\.mina$/,
        loader: '@tinajs/mina-loader',
        options: {
          loaders,
          languages: cssLoadersObject
        },
        include: resolve('src')
      }, {
        test: /\.js$/,
        loader: loaders.script,
        exclude: /node_modules/
      }, {
        test: /\.wxs$/,
        loader: 'relative-file-loader',
        options: {
          name: assetsPath('wxs/[name].[hash:6].[ext]')
        }
      }, {
        test: /\.wxml$/,
        use: [{
          loader: 'relative-file-loader',
          options: {
            name: assetsPath('wxml/[name].[hash:6].[ext]')
          }
        }, 'wxml-loader']
      }, {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2000,
          name: assetsPath('images/[hash:8].[ext]')
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2000,
          name: assetsPath('media/[hash:8].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 2000,
          name: assetsPath('fonts/[hash:8].[ext]')
        }
      }]
    ]
  },
  resolve: {
    symlinks: true,
    extensions: ['.js', '.mina', '.json'],
    alias: {
      'tina': '@tinajs/tina',
      'tina-router': '@tinajs/tina-router',
      'tinax': '@tinajs/tinax',

      '@': resolve('src'),
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'pages': resolve('src/pages'),
      'layout': resolve('src/layout'),
      'plugins': resolve('src/plugins'),
      'static': resolve('src/static'),
      'store': resolve('src/store'),
      'router': resolve('src/router')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': isProduction ? buildEnv : devEnv
    }),
    new MinaEntryPlugin(),
    new MinaRuntimePlugin({
      runtime: 'common/vendor.js'
    }),
    // copy custom static assets
    new CopyWebpackPlugin(
      [{
        from: resolve('static'),
        to: config.assetsSubDirectory,
        ignore: ['.*']
      }]
    )
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common/vendor.js',
      minChunks: 2,
      minSize: 0
    },
    runtimeChunk: {
      name: 'common/manifest.js'
    }
  }
}
