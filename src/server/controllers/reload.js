const configParser = require('../parser')

module.exports = (configFile) => {
  configParser(configFile)
  .then((configParsed) => {
   console.log(configParsed)
   Promise.resolve('OK')
  })
  .catch((err) =>  Promise.resolve(err))
}