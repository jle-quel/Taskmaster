'use strict'

const getByProcessName = require('../process-data').getByProcessName
const _process = require('../process')

const all = (restart) => {
  const start = []
  const processData = require('../process-data').getAll()
  
  Object.keys(processData).map((processGroupName) => {
    Object.keys(processData[processGroupName]).map((processName, index) => {
      if (processData[processGroupName][processName].status === 'STOPPED' || restart) {
        _process.launcher(processData[processGroupName][processName], processGroupName, -1, index)
        start.push(`${processName}: STARTED`)
      }
    })
  })
  return Promise.resolve(start.join('\n'))
}

const one = (processNamesOrGroupName, restart) => {
  const start = []
  const processData = require('../process-data').getAll()
  
  processNamesOrGroupName.map((processNameOrGroupName) => {
    if (processData[processNameOrGroupName]) {
      Object.keys(processData[processNameOrGroupName]).map((processName, index) => {
        if (processData[processNameOrGroupName][processName].status === 'STOPPED' || restart) {
          _process.launcher(processData[processNameOrGroupName][processName], processNameOrGroupName, -1, index)
          start.push(`${processName}: started`)
        }
      })
    } else {
      const processInfos = getByProcessName(processNameOrGroupName)

      if (processInfos) {
        const processDataFound = processInfos[1]

        if (processDataFound.status === 'STOPPED' || restart) {
          _process.launcher(processDataFound, processInfos[0], -1, processInfos[2])
          start.push(`${processNameOrGroupName}: STARTED`)
        }
      } else start.push(`${processNameOrGroupName}: ERROR (no such process)`)
    }
  })
  return Promise.resolve(start.join('\n'))
}

module.exports = {
  all,
  one
}
