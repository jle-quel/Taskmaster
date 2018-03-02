'use strict'

const child_process = require('child_process')

const processInit = (configData) => {
	for (let key in configData) {
		if (configData[key].autostart === true) {
			for (let index = 0; index < configData[key].numprocs; index++) {
				let launcher = child_process.fork('./src/server/child', [configData[key].cmd])
				
				launcher.on('message', (msg) => {
					console.log(msg)
					// console.log(`Code [${msg.code}]`.yellow)
					// console.log(`Signal [${msg.signal}]`.yellow)
					// console.log(`PID [${msg.pid}]`.yellow)
					// console.log(`MSG [${msg.msg}]`.yellow)
				})
			}
		}
	}
}

/* ************************************************************************** */
/*								PUBLIC										  */
/* ************************************************************************** */

module.exports = {
	processInit
}