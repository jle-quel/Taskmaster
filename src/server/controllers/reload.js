const configParser = require('../parser')
const processData = require('../process-data')
const stopAll = require('./stop').all
const _process = require('../process')

module.exports = (configFile) => {
  return configParser(configFile)
  .then((configParsed) => {
    return stopAll()
    .then(() => {
		setTimeout(() => {
      processData.reload()
      processData.initAll(configParsed)
      _process.init()
      return Promise.resolve('Taskmaster reloaded')
  }, 1000)
    })
  })
  .catch((err) => Promise.reject(err))
}
