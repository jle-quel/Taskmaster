'use strict'

const net = require('net')
const readline = require('readline')

const logger = require('../services/logger')
const controller = require('./controller')
const config = require('../config')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: 'taskmaster> '
})

const client = net.createConnection(config.PORT, config.HOST, () => {
	logger.info(`Connected to ${config.HOST}:${config.PORT}`)

	rl.prompt()
	rl.on('line', (line) => {
		if (line) {
			const argv = line.trim().split(' ')

			if (!controller[argv[0]]) {
				controller["error"](argv)
				rl.prompt()
			}
			else
				controller[argv[0]](argv, client)
		} else  rl.prompt()
})

	rl.on('SIGINT', () => {
		client.destroy()
		process.exit(1)
	})
})

client.on('data', (data) => {
	console.log(data.toString())
	rl.prompt()
})

client.on('end', (end) => {
	readline.clearLine(rl, 0)
	readline.cursorTo(rl, 0)
	logger.error(`Disconnected from ${config.HOST}:${config.PORT}`)
	process.exit(0)
})
