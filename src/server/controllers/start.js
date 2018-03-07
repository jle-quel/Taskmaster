'use strict'

const processConfig = require('../process-config').get()
const _process = require('../process')
const processData = require('../process').data

/*const start = {
	"started":
	"start":
	"error":
}*/


const allProcess = () => {
	/*Object.keys(processConfig).map((processGroupName) => {
		const numprocs = processConfig[processGroupName].numprocs
		for (let index = 0; index < numprocs; index++) {
			_process.launcher(processConfig[processGroupName], processGroupName, -1, index)
		}
	})*/
	Object.keys(processData).map((processGroupName) => {
		console.log(processData[processGroupName][processName])

		Object.keys(processData[processGroupName]).map((processName) => {
			console.log(processData[processGroupName][processName])
		})
	})
	return null
}

const checkProcess = (str) => {
	return "start"
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
