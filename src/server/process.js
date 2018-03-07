'use strict'

const child_process = require('child_process')

const processData = require('./process-data').get()

const getOneData = (processToFind) => {
	for (const processGroupName in processData) {
		if (Object.keys(processData[processGroupName]).includes(processToFind)) {
			return processData[processGroupName][processToFind]
		}
	}
	return null
}

const processEventsInit = (_process, processConfig, processGroupName, numOfRestart, numOfProcess) => {
	const processGroupLength = processConfig.config.numprocs
	
	_process.on('message', (processInfo) => {
		if (processInfo.status === 'FINISH' && (
			processConfig.autorestart === "always" || 
			(processConfig.autorestart === "unexpected" &&
			processInfo.code !== processConfig.exitcodes)
		)) launcher(processConfig, processGroupName, numOfRestart + 1)
		else {
			if (!processData[processGroupName]) data[processGroupName] = {}

			processData[processGroupName][`${processGroupLength === 1 ? processGroupName : processGroupName + '_' + numOfProcess}`] = {
				'status': processInfo.status,
				'code': processInfo.code,
				'signal': processInfo.signal,
				'pid': processInfo.pid,
				'command': processInfo.command,
				'time': processInfo.time
			}
		}
	})
}

const getSpawnOptions = (processConfig) => ({
	'shell': true,
	'env': processConfig.env,
	'cwd': processConfig.workingdir
})

const getIoOptions = (processConfig) => ({
	'stderr': processConfig.stderr,
	'stdout': processConfig.stdout
})

const launcher = (processConfig, processGroupName, numOfRestart, numOfProcess) => {
	const spawnOptions = JSON.stringify(getSpawnOptions(processConfig))
	const ioOptions = JSON.stringify(getIoOptions(processConfig))

	if (numOfRestart === processConfig.stoptime) return
	const _process = child_process.fork('./src/server/child-process', [
		processConfig.config.command,
		spawnOptions,
		ioOptions,
		processConfig.config.umask,
		processConfig.config.startsecs
	])
	processEventsInit(_process, processConfig, processGroupName, numOfRestart, numOfProcess)
}

const init = () => {
	Object.keys(processData).map((processGroupName) => {
		Object.keys(processData[processGroupName]).map((processName, index) => {
			const config = processData[processGroupName][processName].config
		
			if (config.autostart) {
				launcher(processData[processGroupName][processName], processGroupName, -1, index)
			}
		})
	})
}


module.exports = {
	getOneData,
	init,
	launcher
}
