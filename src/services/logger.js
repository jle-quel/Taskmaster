'use strict'

const fs = require('fs')

const FILEPATH = './taskmaster.log'

const getDate = () => {
	const event = new Date(Date.now());
	return event.toUTCString()
}

const log = {
	"INIT": (str) => {
		if (fs.existsSync(FILEPATH) === true)
			return `\n\x1b[32mNEW INSTANCE\x1b[0m\n`
		else
			return `\x1b[32mNEW INSTANCE\x1b[0m\n`
	},
	"INFO": (str) => {
		return `${getDate()} INFO: ${str}\n`
	},
	"WARN": (str) => {
		return `${getDate()} \x1b[33mWARN\x1b[0m: ${str}\n`
	}
}


const write = (code, str) => {
	fs.appendFile(FILEPATH, log[code](str), "utf8", (err) =>  {
		if (err) {
			console.error("taskmaster: error in creation of the logger")
			process.exit(1)
		}
	})
}

module.exports = {
	write
}
