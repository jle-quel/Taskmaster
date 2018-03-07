'use strict'

const help = require('./help')
const logger = require('../services/logger')

module.exports = {
	'status': (argv, client) => {
		client.write(JSON.stringify(argv))
	},
	'start': (argv, client) => {
		argv.splice(0, 1)

		if (argv[0])
			client.write(JSON.stringify(argv))
		else {
			console.error("Error")
			//help()
		}
	},
	'stop': (argv, client) => {
		client.write(JSON.stringify(argv))
	},
	'restart': (argv, client) => {
		client.write(JSON.stringify(argv))
	},
	'reload': (argv, client) => {
		client.write(JSON.stringify(argv))
	},
	'shutdown': (argv, client) => {
		client.write(JSON.stringify(argv))
	},
	'help': (argv, client) => {
		argv.length === 1 ? help.Basic(argv) : help.Advance(argv)
	},
	'error': (argv, client) => {
		logger.error(`*** Unknown syntax: ${argv[0]}`)
	}
}
