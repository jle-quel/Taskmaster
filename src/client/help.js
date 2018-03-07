"use strict"

module.exports = {
	"start": () => {
		console.log("start <name>\t\tStart a process or group")
		console.log("start all\t\tStart all processes and group")
	},
	"help": () => {
		console.log("default commands (type help <topic>):")
		console.log("=====================================")
		console.log("status\t\tstart\t\tstop")
		console.log("restart\t\treload\t\tshutdown")
	},
	"error": (str) => {
		console.log(`** No help on ${str}`)
	}
}
