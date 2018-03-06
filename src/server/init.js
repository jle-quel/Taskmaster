const index = require('./index')
const _process = require('./process')
const processConfig = require('./process-config').get()

module.exports = () => {
	Object.keys(processConfig).map((processName) => {
		if (processConfig[processName].autostart) {
			const numprocs = processConfig[processName].numprocs
			for (let index = 0; index < numprocs; index++) {
				_process.launcher(processConfig[processName], processName, -1)
			}
		}
	})
}