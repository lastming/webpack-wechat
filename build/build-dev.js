/**
 * @file: build-dev.
 * @intro: 开发版打包.
 * @author: zhouzhiming.
 * @email: zhouzhiming@pkebu.com.
 * @Date: 2018/10/13 12:22.
 * @Copyright(©) 2018 by pkebu.
 *
 */
process.env.NODE_ENV = 'development'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')

const spinner = ora('building for development...\n')
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
      entrypoints: false,
      cachedAssets: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('Build failed with errors.\n'))
      process.exit(1)
    }
    console.log(chalk.bgYellow(chalk.white(' DONE ')), chalk.yellow(' Compiled successfully.  watching the files…\n'))
  })
})
