'use strict'

const processConfig = require('./process-config').get()

module.exports = {
	'status': (processNames) => {
		if (processNames.length === 0 || processNames[0] === 'all') {

		} else {
		
		}
		return 'toto'
	},
	'start': (argv, socket) => {
		console.log(argv)
	},
	'stop': (argv, socket) => {
		console.log(argv)
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