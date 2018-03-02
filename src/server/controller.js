'use strict'

const launcher = require('./launcher')

module.exports = {
	'status': (argv, socket) => {
		console.log(launcher.processData)
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