'use strict'

const child_process = require('child_process')

const logger = require('../services/logger')

const _process = child_process.spawn(process.argv[2], { shell: true })
logger.info(`Child launched with PID: ${_process.pid} and CMD: ${_process.spawnargs[2]}`)

process.send({
  'status': 'RUNNING',
  'code': null,
  'signal': null,
  'pid': _process.pid
})

// _process.stdout.on('data', (data) => {
//   console.log('*******2')
// })

// _process.stderr.on('data', (data) => {
//   console.log('*******1')
// })

_process.on('exit', (code, signal) => {
  process.send({
    'status': 'FINISH',
    'code': code,
    'signal': signal,
    'pid': _process.pid
  })
})