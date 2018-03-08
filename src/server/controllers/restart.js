'use strict'

const processData = require('../process-data').getAll()
const getByProcessName = require('../process-data').getByProcessName
const _process = require('../process')
const start = require('./start')
const stop = require('./stop')

const all = () => {
	const restart = []
  
  return stop.all()
  .then((stopResult) => {
    restart.push(stopResult)
    return start.all()
    .then((startResult) => {
      restart.push(startResult)
      return Promise.resolve(restart.join())
    })
  })
}


const one = (processNamesOrGroupName) => {
	const start = []
	
	processNamesOrGroupName.map((processNameOrGroupName) => {
		if (processData[processNameOrGroupName]) {
			Object.keys(processData[processNameOrGroupName]).map((processName, index) => {
				if (processData[processNameOrGroupName][processName].status === 'STOPPED') {
					_process.launcher(processData[processNameOrGroupName][processName], processNameOrGroupName, -1, index)
					start.push(`${processData[processNameOrGroupName][processName].config.command}: started`)
				}
			})				
		}
		else {
			const processInfos = getByProcessName(processNameOrGroupName)
			
			if (processInfos) {
				const processDataFound = processInfos[1]
				
				if (processDataFound.status === 'STOPPED') {
					_process.launcher(processDataFound, processInfos[0], -1, processInfos[2])
					start.push(`${processDataFound.config.command}: started`)
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
