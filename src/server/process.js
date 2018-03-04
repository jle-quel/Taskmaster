'use strict'

const child_process = require('child_process')

const logger = require('../services/logger')
const index = require('./index')

const data = {}

const processEventsInit = (_process, getConfig, key, numOfRestart) => {
	const config = getConfig()
	
	_process.on('message', (processInfo) => {
		if (processInfo.status === 'FINISH') {
			if (config[key].autorestart === true || processInfo.code !== config[key].exitcode) {
				launcher(getConfig, key, numOfRestart + 1)
			}
			else
				delete data[processInfo.pid]
		}
		else {
			data[processInfo.pid] = {
				'status': processInfo.status,
				'code': processInfo.code,
				'signal': processInfo.signal,
				'pid': processInfo.pid
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

const launcher = (getConfig, key, numOfRestart) => {
	const config = getConfig()
	const spawnOptions = JSON.stringify(getSpawnOptions(config[key]))
	const ioOptions = JSON.stringify(getIoOptions(config[key]))

	if (numOfRestart === config.stoptime) return
	const _process = child_process.fork('./src/server/child-process', [config[key].cmd, spawnOptions, ioOptions])
	processEventsInit(_process, getConfig, key, numOfRestart)
}

module.exports = {
	data,
	launcher
}
