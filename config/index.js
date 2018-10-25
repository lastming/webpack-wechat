/**
 * @file: config.
 * @intro: 打包配置文件.
 * @author: zhouzhiming.
 * @email: zhouzhiming@pkebu.com.
 * @Date: 2018/10/22 14:41.
 * @Copyright(©) 2018 by pkebu.
 *
 */
const path = require('path')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  // Paths
  assetsRoot: resolve('dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',

  dev: {
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: '#source-map',

    cssSourceMap: true
  },

  build: {
    // https://webpack.js.org/configuration/devtool/#production
    devtool: false,

    cssSourceMap: false,

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
