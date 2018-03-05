const index = require('./index')
const _process = require('./process')
const processConfig = require('./process-config').get()

module.exports = () => {
	for (const processName in processConfig) {
		if (processConfig[processName].autostart) {
			for (let index = 0; index < processConfig[processName].numprocs; index++) {
				_process.launcher(processConfig[processName], -1)
			}
		}
	}
}