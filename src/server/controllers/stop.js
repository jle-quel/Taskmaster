'use strict'

const childProcess = require('child_process')
const processData = require('../process-data').getAll()
const processDataEdit = require('../process-data').edit
const getByProcessName = require('../process-data').getByProcessName

const all = () => {
  const stop = []
	
	Object.keys(processData).map((processGroupName) => {
		Object.keys(processData[processGroupName]).map((processName, index) => {
			const _process = processData[processGroupName][processName]
		
			if (_process.status !== 'STOPPED' && _process.status !== 'EXITED') {
				processDataEdit({killedByMe: true}, processGroupName, processName)
				const processCopy = _process['process']
				delete _process['process']

				processCopy.send(_process)
				childProcess.spawn(`kill -${_process.config.stopsignal} ${_process.pid}`, [], {detached: true, shell: true})
				stop.push(`${_process.config.command}: stopped`)
			}
		})
	})
	return Promise.resolve(stop.join('\n'))
}

const one = (processNamesOrGroupName) => {
  const stop = []
	
  processNamesOrGroupName.map((processNameOrGroupName) => {
		if (processData[processNameOrGroupName]) {
			Object.keys(processData[processNameOrGroupName]).map((processName, index) => {
				const _process = processData[processNameOrGroupName][processName]
			
				if (_process.status !== 'STOPPED' && _process.status !== 'EXITED') {
					processDataEdit({killedByMe: true}, processNameOrGroupName, processName)
					const processCopy = _process['process']
					delete _process['process']

					processCopy.send(_process)
					childProcess.spawn(`kill -${_process.config.stopsignal} ${_process.pid}`, [], {detached: true, shell: true})
					stop.push(`${_process.config.command}: stopped`)
				}
			})				
		}
		else {
			const processInfos = getByProcessName(processNameOrGroupName)
			
			if (processInfos) {
				const processDataFound = processInfos[1]
				
				if (processDataFound.status !== 'STOPPED' && processDataFound.status !== 'EXITED') {
					processDataEdit({killedByMe: true}, processDataFound[0], processNameOrGroupName)
					const processCopy = processDataFound['process']
					delete processDataFound['process']

					processCopy.send(processDataFound)
					childProcess.spawn(`kill -${_process.config.stopsignal} ${processDataFound.pid}`, [], {detached: true, shell: true})
					stop.push(`${processDataFound.config.command}: stopped`)
				}
			} else stop.push(`${processNameOrGroupName}: ERROR (no such process)`)
		}
	})
	return Promise.resolve(stop.join('\n'))
}

module.exports = {
  all,
	one
}