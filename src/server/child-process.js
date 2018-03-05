'use strict'

const child_process = require('child_process')
const fs = require('fs')

const logger = require('../services/logger')
const errorCodes = require('../error-codes')

// process.umask(process.argv[5].umask)
const stdio = JSON.parse(process.argv[4])
const options = JSON.parse(process.argv[3])

const _process = child_process.spawn(process.argv[2], [], options)

process.send({
	'status': 'BOOTING',
	'code': null,
	'signal': null,
	'pid': null,
	'cmd': process.argv[2]
})

// process.send({
// 	'status': 'RUNNING',
// 	'code': null,
// 	'signal': null,
// 	'pid': _process.pid
// })

logger.info(`Child launched with PID: ${_process.pid} and CMD: ${_process.spawnargs[2]}`)

_process.stdout.on('data', (data) => {
	if (stdio.stdout.length !== 0) {
		fs.writeFile(stdio.stdout, data.toString(), (err) => {
			if (err) {
				// print err in logfile;
				_process.kill(15)
			}
		})
	}
})

_process.stderr.on('data', (data) => {
	if (stdio.stderr !== 0) {
		fs.writeFile(stdio.stderr, data.toString(), (err) => {
			if (err) {
				// print err in logfile;
				_process.kill(15)
			}
		})
	}
})

_process.on('exit', (code, signal) => {
	process.send({
	  'status': 'FINISH',
	  'code': signal ? 128 + errorCodes[signal] : code,
	  'signal': signal,
	  'pid': _process.pid,
	  'cmd': process.argv[2]
	})
  })