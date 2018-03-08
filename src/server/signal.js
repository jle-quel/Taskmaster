'use strict'

const processData = require('./process-data')

module.exports = (signal) => {
	const objectToIterate = processData.getAll()

	Object.keys(objectToIterate).map((processGroupName) => {
		Object.keys(objectToIterate[processGroupName]).map((processName) => {
			if (objectToIterate[processGroupName][processName].config.stopsignal === signal)
				console.log(objectToIterate[processGroupName][processName].config.command, "will be exited with signal", objectToIterate[processGroupName][processName].config.stopsignal)
			//stop()
		})
	})
}
