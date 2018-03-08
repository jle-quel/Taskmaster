'use strict'

const status = require('./status')
const start = require('./start')
const stop = require('./stop')

module.exports = {
	'status': (processNamesOrGroupName) => {
		return processNamesOrGroupName.length === 0 || processNamesOrGroupName[0] === 'all' ? status.all() : status.one(processNamesOrGroupName)
	},
	'start': (processNamesOrGroupName) => {
		return processNamesOrGroupName[0] === "all" ? start.all() : start.one(processNamesOrGroupName)
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