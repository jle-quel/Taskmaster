'use strict'

const childProcess = require('child_process')
const processDataEdit = require('../process-data').edit
const getByProcessName = require('../process-data').getByProcessName
const logger = require('../../services/logger.js')

const all = () => {
  const stop = []
  const processData = require('../process-data').getAll()
  
  Object.keys(processData).map((processGroupName) => {
    Object.keys(processData[processGroupName]).map((processName, index) => {
      const processGroupLength = Object.keys(processData[processGroupName]).length
      const _process = processData[processGroupName][processName]

      if (_process.status === 'RUNNING' || _process.status === 'STARTING') {
        processDataEdit({killedByMe: true}, processGroupName, processName)
        const processCopy = {..._process['process']}
        delete _process['process']

        processCopy.send(_process)
        _process['process'] = processCopy
        childProcess.spawn(`kill -${_process.config.stopsignal} ${_process.pid}`, [], {detached: true, shell: true})
        childProcess.exec(`kill -0 ${_process.pid}`, (err, stdout, stderr) => {
          if (stderr === '') {
            logger.write("INFO", `Waiting for the ${processName} with pid: ${_process.pid} to stop`)
            timeout(_process.pid, _process.config.stopwaitsecs)
          } else {
            stop.push(`${processGroupLength === 1 ? '' : processGroupName + ':'}${processName}: STOPPED`)
            logger.write("INFO", `stopped [${processName}] (terminated by ${_process.config.stopsignal})`)
          }
        })
      } else stop.push(`${processName + ':'} ERROR (already stopped)`)
    })
  })
  return Promise.resolve(stop.join('\n'))
}

const one = (processNamesOrGroupName) => {
  const stop = []
  const processData = require('../process-data').getAll()
  
  processNamesOrGroupName.map((processNameOrGroupName) => {
    if (processData[processNameOrGroupName]) {
      Object.keys(processData[processNameOrGroupName]).map((processName, index) => {
        const processGroupLength = Object.keys(processData[processNameOrGroupName]).length
        const _process = processData[processNameOrGroupName][processName]

      if (_process.status === 'RUNNING' || _process.status === 'STARTING') {
          processDataEdit({killedByMe: true}, processNameOrGroupName, processName)
          const processCopy = _process['process']
          delete _process['process']

          processCopy.send(_process)
          childProcess.spawn(`kill -${_process.config.stopsignal} ${_process.pid}`, [], {detached: true, shell: true})
          childProcess.exec(`kill -0 ${_process.pid}`, (err, stdout, stderr) => {
            if (stderr === '') {
              logger.write("INFO", `Waiting for the ${processName} with pid: ${_process.pid} to stop`)
              timeout(_process.pid, _process.config.stopwaitsecs)
            } else {
              stop.push(`${processGroupLength === 1 ? '' : processNameOrGroupName + ':'}${processName}: STOPPED`)
              logger.write("INFO", `stopped [${processName}] (terminated by ${_process.config.stopsignal})`)
            }
          })
        } else stop.push(`${processName + ':'} ERROR (already stopped)`)
      })
    } else {
      const processInfos = getByProcessName(processNameOrGroupName)

      if (processInfos) {
        const processDataFound = processInfos[1]

      if (processDataFound.status === 'RUNNING' || processDataFound.status === 'STARTING') {
          processDataEdit({killedByMe: true}, processInfos[0], processNameOrGroupName)
          const processCopy = processDataFound['process']
          delete processDataFound['process']

          processCopy.send(processDataFound)
          childProcess.spawn(`kill -${processDataFound.config.stopsignal} ${processDataFound.pid}`, [], {detached: true, shell: true})
          childProcess.exec(`kill -0 ${processDataFound.pid}`, (err, stdout, stderr) => {
            if (stderr === '') {
              logger.write("INFO", `Waiting for the ${processNameOrGroupName} with pid: ${processDataFound.pid} to stop`)
              timeout(processDataFound.pid, processDataFound.config.stopwaitsecs)
            } else {
              stop.push(`${processNameOrGroupName}: STOPPED`)
              logger.write("INFO", `stopped [${processNameOrGroupName}] (terminated by ${processDataFound.config.stopsignal})`)
            }
          })
        } else stop.push(`${processNameOrGroupName + ':'} ERROR (already stopped)`)
      } else stop.push(`${processNameOrGroupName}: ERROR (no such process)`)
    }
  })
  return Promise.resolve(stop.join('\n'))
}

const timeout = (pid, stopwaitsecs) => {
  return setTimeout(() => {
    childProcess.spawn(`kill -9 ${pid}`, [], {detached: true, shell: true})
  }, stopwaitsecs * 1000)
}

module.exports = {
  all,
  one
}
