const configParser = require('../parser')

module.exports = (configFile) => {
  return configParser(configFile)
  .then((configParsed) => {
   console.log(123)
   return Promise.resolve('OK')
  })
  .catch((err) =>  {
    return Promise.reject(err)
  })
}