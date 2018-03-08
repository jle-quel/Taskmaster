'use strict'

const net = require('net')
const jsonfile = require('jsonfile')
const fs = require('fs')

const config = require('../config')
const configParser = require('./parser')
const processData = require('./process-data')
const _process = require('./process')
const controller = require('./controllers')
const stopAll = require('./controllers/stop').all
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

const status = require('./controllers/status')

const server = net.createServer((socket) => {
	socket.server.getConnections((err, numberOfConnections) => {
		if (numberOfConnections > 1) {
			socket.write('Sorry only one connection is allowed')
			socket.destroy()
		}
	
		let ping = true
		logger.write("INFO", `New connection from [${socket.remoteAddress}:${socket.remotePort}]`)
		status.all()
			.then((ret) => socket.write(ret))

		socket.on('data', (data) => {
			const command = JSON.parse(data)
			
			if (command[0] === 'shutdown') {
				logger.write("INFO", `Connection to the server stopped from [${socket.remoteAddress}:${socket.remotePort}]`)
				stopAll()
				.then(() => process.exit(0))
			} else {

				controller[command[0]](command.slice(1))
				.then((resultToSend) => {
					if (ping) {
						if (!resultToSend) socket.write('No result')
						else socket.write(resultToSend)
					}
				})
			}
		})

		socket.on('end', () => {
			ping = false
			logger.write("WARN", `Lost connection from [${socket.remoteAddress}:${socket.remotePort}]`)
		})
	})
})

server.listen(8000, () => {
	logger.write("INFO", `server is running on PORT: [${config.PORT}]`)
})

process.on('SIGHUP', () => console.log("supervisord will stop all processes, reload the configuration from the first config file it finds, and start all processes."))
process.on('SIGUSR2', () => console.log("log"))
