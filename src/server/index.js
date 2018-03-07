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
	logger.info(`New connection from ${socket.remoteAddress}:${socket.remotePort}`)
		
	// process.on('SIGHUP', () => {
	// 	console.log("Received SIGHUP")
	// })
	
	socket.on('data', (data) => {
		const command = JSON.parse(data)
		
		const resultToSend = controller[command[0]](command.slice(1))
		socket.write(resultToSend)
	})
	
	socket.on('end', () => {
		logger.warn(`Lost connection from ${socket.remoteAddress}:${socket.remotePort}`)
	})
}).listen(8000, () => logger.info(`Server is running on PORT: ${config.PORT}`))
