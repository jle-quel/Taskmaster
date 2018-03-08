'use strict'

const net = require('net')
const jsonfile = require('jsonfile')

const config = require('../config')
const configParser = require('./parser')
const processData = require('./process-data')
const _process = require('./process')
const controller = require('./controllers')
const logger = require('../services/logger')
const handleSignal = require('./signal')

if (process.argv.length !== 3) {
	logger.error('Usage: npm start')
	process.exit(1)
}

configParser(process.argv[2])
.then((configParsed) => {
	processData.init(configParsed)
	_process.init()
})
.catch((err) => {
	logger.error(err)
	process.exit(1)
})

const server = net.createServer((socket) => {
	let ping = true
	logger.info(`New connection from ${socket.remoteAddress}:${socket.remotePort}`)
		
	socket.on('data', (data) => {
		const command = JSON.parse(data)

		if (command.status === "command") {
			const resultToSend = controller[command.value[0]](command.value.splice(1))
			if (resultToSend && ping) socket.write(resultToSend)
		}
		else {
			const resultToSend = handleSignal(command.value)
			if (resultToSend && ping) console.log(resultToSend)
		}
	})
	
	socket.on('end', () => {
		ping = false
		logger.warn(`Lost connection from ${socket.remoteAddress}:${socket.remotePort}`)
	})

}).listen(8000, () => logger.info(`Server is running on PORT: ${config.PORT}`))
