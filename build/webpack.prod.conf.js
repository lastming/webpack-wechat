/**
 * @file: webpack.prod.conf.
 * @intro: webpack生产版配置.
 * @author: zhouzhiming.
 * @email: zhouzhiming@pkebu.com.
 * @Date: 2018/10/11 16:55.
 * @Copyright(©) 2018 by pkebu.
 *
 */
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        },
        sourceMap: false,
        parallel: true
      })
    ]
  }
})

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
