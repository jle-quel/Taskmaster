'use strict'

const help = require('./help')

const checkCommand = (command) => {
	if (command[1]) return command
	else {
		console.error(`Error: ${command[0]} requires a process name`)
		help[command[0]]()
		return null
	}
}

module.exports = {
	'status': (argv) => argv,
	'start': (argv) => checkCommand(argv),
	'stop': (argv) => checkCommand(argv),
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
