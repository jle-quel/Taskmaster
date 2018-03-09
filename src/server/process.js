'use strict'

const childProcess = require('child_process')

const processData = require('./process-data').getAll()
const processDataEdit = require('./process-data').edit

const processEventsInit = (_process, processConfig, processGroupName, numOfRestart, numOfProcess) => {
  const processGroupLength = processConfig.config.numprocs

  _process.on('message', (processInfo) => {
    if (processInfo.status === 'FINISH' && (
      processConfig.autorestart === 'always' ||
      (processConfig.autorestart === 'unexpected' &&
      processInfo.code !== processConfig.exitcodes)
    )) launcher(processConfig, processGroupName, numOfRestart + 1)
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

const getSpawnOptions = (processConfig) => ({
  'shell': true,
  'env': processConfig.config.env,
  'cwd': processConfig.config.directory
})

const getIoOptions = (processConfig) => ({
  'stderr_logfile': processConfig.config.stderr_logfile,
  'stdout_logfile': processConfig.config.stdout_logfile
})

const launcher = (processConfig, processGroupName, numOfRestart, numOfProcess) => {
  const spawnOptions = JSON.stringify(getSpawnOptions(processConfig))
  const ioOptions = JSON.stringify(getIoOptions(processConfig))

  if (numOfRestart === processConfig.stoptime) return
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
  init,
  launcher
}
