'use strict'

const status = require('./status')
const start = require('./start')
const stop = require('./stop')
const signalCodes = require('../../signal-codes')

module.exports = {
	'status': (processNamesOrGroupName) => {
		return processNamesOrGroupName.length === 0 || processNamesOrGroupName[0] === 'all' ? status.all() : status.one(processNamesOrGroupName)
	},
	'start': (processNamesOrGroupName) => {
		return processNamesOrGroupName[0] === "all" ? start.all() : start.one(processNamesOrGroupName)
	},
	'stop': (processNamesOrGroupName) => {
		return processNamesOrGroupName[0] === "all" ? stop.all() : stop.one(processNamesOrGroupName, signalCodes.SIGTERM)
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