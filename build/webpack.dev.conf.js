/**
 * @file: webpack.dev.conf.
 * @intro: webpack开发版配置.
 * @author: zhouzhiming.
 * @email: zhouzhiming@pkebu.com.
 * @Date: 2018/10/11 15:40.
 * @Copyright(©) 2018 by pkebu.
 *
 */
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  watch: true
})
