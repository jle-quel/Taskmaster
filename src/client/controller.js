'use strict'

const help = require('./help')
const logger = require('../services/logger')

module.exports = {
	'status': (argv) => argv,
	'start': (argv) => {
		if (argv[1]) return argv
		else {
			console.error("error: start requires a process name")
			help["start"]()
			return null
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
	'help': (argv) => {
		if (argv.length === 1) help[argv[0]]()
		else if (argv.length > 2) help["error"](argv.join(" "))
		else help[argv[1]] ? help[argv[1]]() : help["error"](argv[1]) 
	},
	'error': (argv, client) => {
		console.error(`*** Unknown syntax: ${argv[0]}`)
	}
}
