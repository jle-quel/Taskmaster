'use strict'

const childProcess = require('child_process')
const fs = require('fs')

const logger = require('../services/logger')
const errorCodes = require('../signal-codes')

let processData = {}

const options = JSON.parse(process.argv[3])
const stdio = JSON.parse(process.argv[4])
process.umask(process.argv[5].umask)

const _process = childProcess.spawn(process.argv[2], [], options)
logger.write('INFO', `process [${process.argv[2]}] starting with PID [${_process.pid}]`)
process.send({
  'status': 'STARTING',
  'code': null,
  'signal': null,
  'pid': null,
  'ppid': null,
  'killedByMe': false,
  'time': null
})

setTimeout(() => {
  logger.write('INFO', `process [${process.argv[2]}] is running with PID [${_process.pid}]`)
  process.send({
    'status': 'RUNNING',
    'code': null,
    'signal': null,
    'killedByMe': false,
    'pid': _process.pid,
    'ppid': process.pid,
    'time': Date.now()
  })
}
, parseInt(process.argv[6]) * 1000)

_process.stdout.on('data', (data) => {
	if (stdio.stdout) {
		fs.writeFile(stdio.stdout, data.toString(), (err) => {
			if (err) {
				logger.write("FATAL", `fs: err`)
				_process.kill(processData.config.stopsignal)
			}
		})
	}
})

_process.stderr.on('data', (data) => {
	if (stdio.stderr) {
		fs.writeFile(stdio.stderr, data.toString(), (err) => {
			if (err) {
				logger.write("FATAL", `fs: err`)
				_process.kill(processData.config.stopsignal)
			}
		})
	}
})

process.on('message', (data) => { processData = data })

_process.on('exit', (code, signal) => {
  const returnCode = signal ? 128 + errorCodes[signal] : code
  logger.write(`${returnCode ? 'WARN' : 'INFO'}`, `exited: [${process.argv[2]}] (exit status [${returnCode}])`)

  if (processData.killedByMe === true) {
    process.send({
      'status': 'STOPPED',
      'code': returnCode,
      'signal': signal,
      'pid': _process.pid,
      'killedByMe': false,
      'ppid': process.ppid,
      'time': null
    })
  } else {
    process.send({
      'status': 'EXITED',
      'code': returnCode,
      'signal': signal,
      'pid': _process.pid,
      'killedByMe': false,
      'ppid': process.ppid,
      'time': null
    })
  }
  process.exit(0)
})
