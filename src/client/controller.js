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
			console.error("error: start requires a process name")
			help["start"]()
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
		argv.splice(0, 1)
		
		if (argv[0])
			help[argv[0]] ? help[argv[0]]() : help["error"](argv.join(" "))
		else
			help["help"]()
		
	},
	'error': (argv, client) => {
		console.error(`*** Unknown syntax: ${argv[0]}`)
	}
}
