'use strict'

const status = require('./controllers/status')
const start = require('./controllers/start')
const stop = require('./controllers/stop')

module.exports = {
	'status': (processNamesOrGroupName) => {
		if (processNamesOrGroupName.length === 0 || processNamesOrGroupName[0] === 'all') return status(null)
		else return status(processNamesOrGroupName)
	},
	'start': (argv) => {
		return argv[0] === "all" ? start.allProcess() : start.oneProcess(argv)
	},
	'stop': (argv) => {
		return argv[0] === "all" ? stop.allProcess() : start.oneProcess(argv)
	},
	'restart': (argv, socket) => {
		console.log(argv)
	},
	'reload': (argv, socket) => {
		console.log(argv)
	},
	'shutdown': (argv, socket) => {
		console.log(argv)
	},
}