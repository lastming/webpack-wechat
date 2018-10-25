/**
 * @file: cssLoaders.
 * @intro: 样式loader.
 * @author: zhouzhiming.
 * @email: zhouzhiming@pkebu.com.
 * @Date: 2018/10/11 18:55.
 * @Copyright(©) 2018 by pkebu.
 *
 */
module.exports = sourceMap => {
  sourceMap = !!sourceMap

  const generateLoaders = (loader, loaderOptions) => {
    const loaders = [{
      loader: 'postcss-loader',
      options: {sourceMap}
    }]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {sourceMap})
      })
    }

    return loaders
  }

  return {
    css: generateLoaders(),
    wxss: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
