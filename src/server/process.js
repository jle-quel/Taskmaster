'use strict'

const child_process = require('child_process')

const logger = require('../services/logger')
const index = require('./index')

const data = {}

const processEventsInit = (_process, processConfig, processGroupName, numOfRestart, numOfProcess) => {
	const processGroupLength = processConfig.numprocs
	
	_process.on('message', (processInfo) => {
		if (processInfo.status === 'FINISH' && (
			processConfig.autorestart === "always" || 
			(processConfig.autorestart === "unexpected" &&
			processInfo.code !== processConfig.exitcodes)
		)) launcher(processConfig, processGroupName, numOfRestart + 1)
		else {
			if (!data[processGroupName]) data[processGroupName] = {}
				
			data[processGroupName][`${processGroupLength === 1 ? processGroupName : processGroupName + '_' + numOfProcess}`] = {
				'status': processInfo.status,
				'code': processInfo.code,
				'signal': processInfo.signal,
				'pid': processInfo.pid,
				'cmd': processInfo.cmd,
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
		processConfig.command,
		spawnOptions,
		ioOptions,
		processConfig.umask,
		processConfig.startsecs
	])
	processEventsInit(_process, processConfig, processGroupName, numOfRestart, numOfProcess)
}

module.exports = {
	data,
	launcher
}
