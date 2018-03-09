'use strict'

const getByProcessName = require('../process-data').getByProcessName
const start = require('./start')
const stop = require('./stop')

const all = () => {
  const restart = []
  const processData = require('../process-data').getAll()
  
  return stop.all()
  .then((stopResult) => {
    restart.push(stopResult)
    return start.all(true)
    .then((startResult) => {
      restart.push(startResult)
      return Promise.resolve(restart.join())
    })
  })
}

const one = (processNamesOrGroupName) => {
  const restart = []
  const processData = require('../process-data').getAll()
  
  return Promise.all(processNamesOrGroupName.map((processNameOrGroupName) => {
    if (processData[processNameOrGroupName]) {
      return stop.one([processNameOrGroupName])
      .then((stopResult) => {
        restart.push(stopResult)
        return start.one([processNameOrGroupName], true)
        .then((startResult) => {
          restart.push(startResult)
          console.log(startResult)
          return Promise.resolve(restart.join())
        })
      })
    } else {
      const processInfos = getByProcessName(processNameOrGroupName)
      const processName = Object.keys(processData[processInfos[0]])[processInfos[2]]

      return stop.one([processName])
      .then((stopResult) => {
        restart.push(stopResult)
        return start.one([processName], true)
        .then((startResult) => {
          restart.push(startResult)
          return Promise.resolve(restart)
        })
      })
    }
  }))
  .then(([restartResult]) => {
    return Promise.resolve(restartResult.join('\n'))
  })
}

module.exports = {
  all,
  one
}
