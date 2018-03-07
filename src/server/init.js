const index = require('./index')
const _process = require('./process')
const processConfig = require('./process-config').get()
require process data

module.exports = () => {
	Object.keys(processConfig).map((processGroupName) => {
		if (processConfig[processGroupName].autostart) {
			const numprocs = processConfig[processGroupName].numprocs
			for (let index = 0; index < numprocs; index++) {
				_process.launcher(processConfig[processGroupName], processGroupName, -1, index)
			}
		}
	})
}
