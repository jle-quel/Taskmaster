'use strict'

const net = require('net')
const jsonfile = require('jsonfile')

const config = require('../config')
const configParser = require('./parser')
const processData = require('./process-data')
const _process = require('./process')
const controller = require('./controllers')
const logger = require('../services/logger')

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
		
		const resultToSend = controller[command[0]](command.splice(1))
		if (resultToSend && ping) socket.write(resultToSend)
	})
	
	socket.on('end', () => {
		ping = false
		logger.warn(`Lost connection from ${socket.remoteAddress}:${socket.remotePort}`)
	})

}).listen(8000, () => logger.info(`Server is running on PORT: ${config.PORT}`))
