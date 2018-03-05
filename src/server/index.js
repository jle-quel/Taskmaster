'use strict'

const net = require('net')
const jsonfile = require('jsonfile')

const GET_CONFIG = require('../config').GET_CONFIG
const logger = require('../services/logger')
const initConfig = require('./init')
const configParser = require('./parser')

if (process.argv.length !== 3) {
	logger.error('Usage: npm start')
	process.exit(1)
}

configParser(process.argv[2])
.then((configParsed) => {
	const getConfig = GET_CONFIG()
	
	getConfig(configParsed)
	initConfig(getConfig)
})
.catch((err) => {
	if (err) logger.error(err)
	else logger.error('Parser failed')
	process.exit(1)
})

// const server = net.createServer((socket) => {
// 	logger.info(`New connection from ${socket.remoteAddress}:${socket.remotePort}`)
		
// 	process.on('SIGHUP', () => {
// 		console.log("Received SIGHUP")
// 	})
	
// 	socket.on('data', (data) => {
// 		const cmd = JSON.parse(data)
// 		controller[cmd[0]](cmd, socket)
// 	})
	
// 	socket.on('end', () => {
// 		logger.warn(`Lost connection from ${socket.remoteAddress}:${socket.remotePort}`)
// 	})
// }).listen(8000, () => logger.info(`Server is running on PORT: ${config.PORT}`))