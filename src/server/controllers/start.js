'use strict'

const processData = require('../process-data').getAll()
const _process = require('../process')


const all = () => {
	const start = []
	
	Object.keys(processData).map((processGroupName) => {
		Object.keys(processData[processGroupName]).map((processName, index) => {
			if (processData[processGroupName][processName].status === 'STOPPED') {
				_process.launcher(processData[processGroupName][processName], processGroupName, -1, index)
				response.push(`started: ${processData[processGroupName][processName].config.command}`)
			}
		})
	})
	return start.join('\n')
}


const one = (processNamesOrGroupName) => {
	argv.forEach((element) => {
		const status = checkProcess(element)
		console.log(`Element [${element}] Status [${status}]`)
	})
	return null
}

module.exports = {
	all,
	one
}
