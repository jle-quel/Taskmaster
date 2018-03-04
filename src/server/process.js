'use strict'

const child_process = require('child_process')

const logger = require('../services/logger')

const data = {}

const processEventsInit = (launcher) => {
	launcher.on('message', (processInfo) => {
		if (processInfo.status === 'FINISH')
			delete data[processInfo.pid]
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

const launcher = (cmd, spawnOptions, ioOptions) => {
	const launcher = child_process.fork('./child-process', [cmd, JSON.stringify(spawnOptions), ioOptions])
	processEventsInit(launcher)
}

module.exports = {
	data,
	launcher
}
