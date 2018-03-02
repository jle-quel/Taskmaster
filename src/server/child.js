'use strict'

const child_process = require('child_process')

const logger = require('../services/logger')
const _process = child_process.spawn(process.argv[2], { shell: true })

logger.info(`Child launched with PID: ${_process.pid} and CMD: ${_process.argv[2]}`)

_process.stdout.on('data', (data) => {
})

_process.stderr.on('data', (data) => {
})

_process.on('exit', (code, signal) => {
    process.send({
        'code': code,
        'signal': signal,
        'pid': _process.pid,
        'msg': true
    })
})