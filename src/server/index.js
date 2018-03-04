'use strict'

const net = require('net')
const jsonfile = require('jsonfile')

const config = require('../config')
const logger = require('../services/logger')
const init = require('./init')
const configParser = require('./parser')

if (process.argv.length !== 3) {
	logger.error('Usage: node src/server/index.js [config.json]')
	process.exit(1)
}

configParser(process.argv[2])
.then((configParsed) => {
	logger.info('Config file has been parsed successfully')
	
	const getConfig = config.GET_CONFIG()
	getConfig(configParsed)
	init(getConfig)
})
.catch((err) => {
	logger.error(err)
	process.exit(1)
})

// const launcher = require('./launcher')
		// const server = net.createServer((socket) => {
		// 	logger.info(`New connection from ${socket.remoteAddress}:${socket.remotePort}`)
		
		// 	process.on('SIGHUP', () => {
		// 		console.log("Received SIGHUP")
		// 	})
			
		// 	socket.on('data', (data) => {
				// const cmd = JSON.parse(data)
				// controller.cmd[0]()
				// controller[cmd[0]](cmd, socket)
		// 	})
			
		// 	socket.on('end', () => {
		// 		logger.warn(`Lost connection from ${socket.remoteAddress}:${socket.remotePort}`)
		// 	})
		// }).listen(8000, () => logger.info(`Server is running on PORT: ${config.PORT}`))
	// })
	// .catch(() => process.exit(1) )
// })