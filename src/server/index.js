'use strict'

const net = require('net')
const jsonfile = require('jsonfile')

const logger = require('../services/logger')
const config = require('../config')
const initConfig = require('./init')
const configParser = require('./parser')
const processConfig = require('./process-config')
const controller = require('./controller')

if (process.argv.length !== 3) {
	logger.error('Usage: npm start')
	process.exit(1)
}

configParser(process.argv[2])
.then((configParsed) => {
	processConfig.edit(configParsed)
	initConfig()
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
