'use strict'

const processData = require('../process-data').get()
const _process = require('../process')


const allProcess = () => {
	Object.keys(processData).map((processGroupName) => {
		Object.keys(processData[processGroupName]).map((processName, index) => {
			if (processData[processGroupName][processName].status === 'STOPPED') {
				_process.launcher(processData[processGroupName][processName], processGroupName, -1, index)	
			}
		})
	})
}


const oneProcess = (argv) => {
	argv.forEach((element) => {
		const status = checkProcess(element)
		console.log(`Element [${element}] Status [${status}]`)
	})
	return null
}

module.exports = {
	allProcess,
	oneProcess
}
