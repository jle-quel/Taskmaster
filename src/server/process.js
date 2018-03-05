'use strict'

const child_process = require('child_process')

const logger = require('../services/logger')
const index = require('./index')

const data = {}

const processEventsInit = (_process, processConfig, numOfRestart) => {
	_process.on('message', (processInfo) => {
		if (processInfo.status === 'FINISH') {
			if (
				processConfig.autorestart === "always" || 
				processConfig.autorestart === "unexpected" &&
				processInfo.code !== processConfig.exitcodes
			)
				launcher(getConfig, key, numOfRestart + 1)
			else
				delete data[processInfo.pid]
		}
		else {
			data[processInfo.pid] = {
				'status': processInfo.status,
				'code': processInfo.code,
				'signal': processInfo.signal,
				'pid': processInfo.pid,
				'cmd': processInfo.cmd
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

const launcher = (processConfig, numOfRestart) => {
	const spawnOptions = JSON.stringify(getSpawnOptions(processConfig))
	const ioOptions = JSON.stringify(getIoOptions(processConfig))

	if (numOfRestart === processConfig.stoptime) return
	const _process = child_process.fork('./src/server/child-process', [
		processConfig.command,
		spawnOptions,
		ioOptions,
		processConfig.umask
	])
	processEventsInit(_process, processConfig, numOfRestart)
}

module.exports = {
	data,
	launcher
}
