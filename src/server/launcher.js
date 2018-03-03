'use strict'

const child_process = require('child_process')

const logger = require('../services/logger')

const processData = {}

const processEventsInit = (launcher) => {
	launcher.on('message', (processInfo) => {
		if (processInfo.status === 'FINISH') delete processData[processInfo.pid]
		else {
			processData[processInfo.pid] = {
				'status': processInfo.status,
				'code': processInfo.code,
				'signal': processInfo.signal
			}
		} 
	})
}

const processInit = (configData) => {
	for (const key in configData) {
			if (configData[key].autostart && configData[key].numprocs) {
			Array(configData[key].numprocs).fill(null).map(_ => {
				const launcher = child_process.fork('./src/server/process', [configData[key].cmd])
				
				processEventsInit(launcher)
			})
		}
	}
}

module.exports = {
	processInit,
	processData
}