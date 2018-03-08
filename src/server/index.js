'use strict'

const net = require('net')
const jsonfile = require('jsonfile')
const fs = require('fs')

const config = require('../config')
const configParser = require('./parser')
const processData = require('./process-data')
const _process = require('./process')
const controller = require('./controllers')
const signal = require('./signal')
const logger = require('../services/logger')


if (process.argv.length !== 3) {
	console.error('Usage: npm run start:server')
	process.exit(1)
}

logger.write("INIT")
configParser(process.argv[2])
.then((configParsed) => {
	logger.write("INFO", `[${process.argv[2]}] was sucessfully parsed`)

	processData.init(configParsed)
	_process.init()
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})

const server = net.createServer((socket) => {
	let ping = true
	logger.write("INFO", `New connection from [${socket.remoteAddress}:${socket.remotePort}]`)

		
	socket.on('data', (data) => {
		const command = JSON.parse(data)

		if (command.status === "command") {
			const resultToSend = controller[command.value[0]](command.value.splice(1))
			if (resultToSend && ping) socket.write(resultToSend)
		}
		else {
			const resultToSend = signal.handle(command.value)
			if (resultToSend && ping) console.log(resultToSend)
		}
	})
	
	socket.on('end', () => {
		ping = false
		logger.write("WARN", `Lost connection from [${socket.remoteAddress}:${socket.remotePort}]`)
	})
})

server.listen(8000, () => {
	logger.write("INFO", `server is running on PORT: [${config.PORT}]`)
})

process.on('SIGHUP', () => console.log("supervisord will stop all processes, reload the configuration from the first config file it finds, and start all processes."))
process.on('SIGINT', () => signal.killAll())
process.on('SIGQUIT', () => signal.killAll())
process.on('SIGTERM', () => signal.killAll())
process.on('SIGUSR2', () => signal.log())
