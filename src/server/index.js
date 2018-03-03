'use strict'

const net = require('net')
const jsonfile = require('jsonfile')
const config = require('../config')

const controller = require('./controller')
const launcher = require('./launcher')
const logger = require('../services/logger')

if (process.argv.length !== 3) {
	logger.error('Usage: node src/server/index.js [config.json]')
	process.exit(1)
}

jsonfile.readFile(process.argv[2], (err, configData) => {
	if (err) {
		logger.error('Bad config file')
		process.exit(1)
	}
	else {
		const server = net.createServer((socket) => {
			logger.info(`New connection from ${socket.remoteAddress}:${socket.remotePort}`)
			launcher.processInit(configData)
		
			socket.on('data', (data) => {
				const cmd = JSON.parse(data)
				
				controller[cmd[0]](cmd, socket)
			})
			
			socket.on('end', () => {
				logger.warn(`Lost connection from ${socket.remoteAddress}:${socket.remotePort}`)
			})
		}).listen(8000, () => logger.info(`Server is running on PORT: ${config.PORT}`))
	} 
})
