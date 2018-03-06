'use strict'

const child_process = require('child_process')
const fs = require('fs')

const logger = require('../services/logger')
const errorCodes = require('../error-codes')

const options = JSON.parse(process.argv[3])
const stdio = JSON.parse(process.argv[4])
process.umask(process.argv[5].umask)

const _process = child_process.spawn(process.argv[2], [], options)

process.send({
	'status': 'BOOTING',
	'code': null,
	'signal': null,
	'pid': _process.pid,
	'cmd': process.argv[2]
})

setTimeout(() => {
	process.send({
		'status': 'RUNNING',
		'code': null,
		'signal': null,
		'pid': _process.pid,
		'cmd': process.argv[2]
	})
}
, parseInt(process.argv[6]) * 1000)

logger.info(`Child launched with PID: ${_process.pid} and CMD: ${_process.spawnargs[2]}`)

_process.stdout.on('data', (data) => {
	if (stdio.stdout) {
		fs.writeFile(stdio.stdout, data.toString(), (err) => {
			if (err) {
				// print err in logfile;
				_process.kill(15)
			}
		})
	}
})

_process.stderr.on('data', (data) => {
	if (stdio.stderr) {
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