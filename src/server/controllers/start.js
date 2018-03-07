'use strict'

const processConfig = require('../process-config').get()
const _process = require('../process')

/*const start = {
	"started":
	"start":
	"error":
}*/


const allProcess = () => {
	Object.keys(processConfig).map((processGroupName) => {
		const numprocs = processConfig[processGroupName].numprocs
		for (let index = 0; index < numprocs; index++) {
			_process.launcher(processConfig[processGroupName], processGroupName, -1, index)
		}
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
