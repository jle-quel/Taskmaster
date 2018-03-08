'use strict'

const processData = require('./process-data')

const handle = (signal) => {
	const objectToIterate = processData.getAll()

	Object.keys(objectToIterate).map((processGroupName) => {
		Object.keys(objectToIterate[processGroupName]).map((processName) => {
			if (objectToIterate[processGroupName][processName].config.stopsignal === signal)
				console.log(objectToIterate[processGroupName][processName].config.command, "will be exited with signal", objectToIterate[processGroupName][processName].config.stopsignal)
			//stop()
		})
	})
}

const killAll = () => {
	console.log("supervisord and all its subprocesses will shut down. This may take several seconds.")
}

const log = () => {
	console.log("supervisord will close and reopen the main activity log and all child log files.")
}

module.exports = {
	handle,
	kill,
	log
}
