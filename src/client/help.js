'use strict'

module.exports = {
	'start': () => {
		console.log('start <name/gname>\tStart a process or group')
		console.log('start all\t\tStart all processes and group')
	},
	'status': () => {
		console.log('status <name/gname>\tGet status for a single or group process')
		console.log('status	\t\tGet all process status info')
	},
	'help': () => {
		console.log('default commands (type help <topic>):')
		console.log('=====================================')
		console.log('status\t\tstart\t\tstop')
		console.log('restart\t\treload\t\tshutdown')
	},
	'error': (str) => {
		console.log(`** No help on ${str}`)
	}
}
