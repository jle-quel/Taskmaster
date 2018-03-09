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
logger.write('INFO', `spawned [${process.argv[2]}] with pid [${_process.pid}]`)
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
	logger.write('INFO', `success [${process.argv[2]}] entered RUNNING state`)
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

process.on('message', (data) => { processData = data })

const writeInFile = (str) => {
	try {
		fs.writeFileSync(stdio.stdout_logfile, str)
	}
	catch(err) {
		logger.write("INFO", `error: EACCES permission denied on ${stdio.stdout_logfile}`)
	}
}

_process.stdout.on('data', (data) => {
	if (stdio.stdout_logfile)
		writeInFile(data.toString())
})

_process.stderr.on('data', (data) => {
	if (stdio.stderr_logfile)
		writeInFile(data.toString())
})

  logger.write(`INFO`, `exited: [${process.argv[2]}] with exit status`)
_process.on('exit', (code, signal) => {
  const returnCode = signal ? 128 + errorCodes[signal] : code
  logger.write(`${returnCode ? 'WARN' : 'INFO'}`, `exited: [${process.argv[2]}] with exit status [${returnCode}])`)

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
