const {version} = require('../package')
module.exports = {
  NODE_ENV: '"production"',
  NODE_VERSION: JSON.stringify(version)
}
