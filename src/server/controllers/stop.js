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

      if (_process.status === 'RUNNING') {
        processDataEdit({killedByMe: true}, processGroupName, processName)
        const processCopy = {..._process['process']}
        delete _process['process']

        processCopy.send(_process)
        _process['process'] = processCopy
        childProcess.spawn(`kill -${_process.config.stopsignal} ${_process.pid}`, [], {detached: true, shell: true})
        stop.push(`${processGroupLength === 1 ? '' : processGroupName + ':'}${processName}: STOPPED`)
	    	logger.write("INFO", `stopped [${processName}] (terminated by ${_process.config.stopsignal})`)
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

        if (_process.status === 'RUNNING') {
            processDataEdit({killedByMe: true}, processNameOrGroupName, processName)
          const processCopy = _process['process']
          delete _process['process']

          processCopy.send(_process)
          childProcess.spawn(`kill -${_process.config.stopsignal} ${_process.pid}`, [], {detached: true, shell: true})
          stop.push(`${processGroupLength === 1 ? '' : processNameOrGroupName + ':'}${processName}: STOPPED`)
		      logger.write("INFO", `stopped [${processName}] (terminated by ${_process.config.stopsignal})`)
        } else stop.push(`${processName + ':'} ERROR (already stopped)`)
      })
    } else {
      const processInfos = getByProcessName(processNameOrGroupName)

      if (processInfos) {
        const processDataFound = processInfos[1]

        if (processDataFound.status === 'RUNNING') {
          processDataEdit({killedByMe: true}, processInfos[0], processNameOrGroupName)
          const processCopy = processDataFound['process']
          delete processDataFound['process']

          processCopy.send(processDataFound)
          childProcess.spawn(`kill -${processDataFound.config.stopsignal} ${processDataFound.pid}`, [], {detached: true, shell: true})
          stop.push(`${processNameOrGroupName}: STOPPED`)
        } else stop.push(`${processNameOrGroupName + ':'} ERROR (already stopped)`)
      } else stop.push(`${processNameOrGroupName}: ERROR (no such process)`)
    }
  })
  return Promise.resolve(stop.join('\n'))
}

module.exports = {
  all,
  one
}
