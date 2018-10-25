/**
 * @file: build-prod.
 * @intro: 生产版打包.
 * @author: zhouzhiming.
 * @email: zhouzhiming@pkebu.com.
 * @Date: 2018/10/13 12:25.
 * @Copyright(©) 2018 by pkebu.
 *
 */
process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...\n')
spinner.start()

rm(path.join(webpackConfig.output.path, '*'), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
