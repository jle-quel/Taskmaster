'use strict'

const childProcess = require('child_process')

const processDataEdit = require('./process-data').edit
const logger = require('../services/logger')

const exitProcess = {
	"always": (processInfo, processConfig, processGroupName, numOfRestart, numOfProcess) => {
		launcher(processConfig, processGroupName, numOfRestart - 1)
	},
	"unexpected": (processInfo, processConfig, processGroupName, numOfRestart, numOfProcess) => {
		if (!processConfig.config.exitcodes.includes(processInfo.code) && numOfRestart)
			launcher(processConfig, processGroupName, numOfRestart - 1)
	},
	"never": () => { return }
}

const getSpawnOptions = (processConfig) => ({
  'shell': true,
  'env': processConfig.config.env,
  'cwd': processConfig.config.directory
})

const getIoOptions = (processConfig) => ({
  'stderr_logfile': processConfig.config.stderr_logfile,
  'stdout_logfile': processConfig.config.stdout_logfile
})

const processEventsInit = (_process, processConfig, processGroupName, numOfRestart, numOfProcess) => {
	const processGroupLength = processConfig.config.numprocs
	const processData = require('./process-data').getAll()
	
	_process.on('message', (processInfo) => {
		if (processInfo.status === 'FINISH' || processInfo.status === 'EXITED')
			exitProcess[processConfig.config.autorestart](processInfo, processConfig, processGroupName, numOfRestart, numOfProcess)
		else {
			if (!processData[processGroupName]) processData[processGroupName] = {}
			
			const processDataInfo = processData[processGroupName][`${processGroupLength === 1 ? processGroupName : processGroupName + '_' + numOfProcess}`]
			processDataEdit(processInfo, processGroupName, `${processGroupLength === 1 ? processGroupName : processGroupName + '_' + numOfProcess}`)
			
			delete processDataInfo['process']
			_process.send(processDataInfo)
			processDataInfo['process'] = _process
		}
	})
}

const launcher = (processConfig, processGroupName, numOfRestart, numOfProcess) => {
	const spawnOptions = JSON.stringify(getSpawnOptions(processConfig))
	const ioOptions = JSON.stringify(getIoOptions(processConfig))
	
	if (numOfRestart === -1) {
		logger.write("INFO", `gave up [${processConfig.config.command}] after max autorestart`)
		return
	}
	
	const _process = childProcess.fork('./src/server/child-process', [
		processConfig.config.command,
		spawnOptions,
		ioOptions,
		processConfig.config.umask,
		processConfig.config.startsecs
	])
	processEventsInit(_process, processConfig, processGroupName, numOfRestart, numOfProcess)
}

const init = () => {
	const processData = require('./process-data').getAll()
	
	Object.keys(processData).map((processGroupName) => {
		Object.keys(processData[processGroupName]).map((processName, index) => {
			const config = processData[processGroupName][processName].config
			
			if (config.autostart) {
				launcher(processData[processGroupName][processName], processGroupName, config.startretries, index)
			}
		})
	})
}

module.exports = {
	init,
	launcher
}
