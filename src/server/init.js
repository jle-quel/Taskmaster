const index = require('./index')
const _process = require('./process')
const processConfig = require('./process-config').get()
const processData = require('./process').data

module.exports = () => {
	Object.keys(processConfig).map((processGroupName) => {
		const numprocs = processConfig[processGroupName].numprocs
		
		if (processConfig[processGroupName].autostart) {
			for (let index = 0; index < numprocs; index++) {
				_process.launcher(processConfig[processGroupName], processGroupName, -1, index)
			}
		} else {
			if (!processData[processGroupName]) processData[processGroupName] = {}
			
			for (let index = 0; index < numprocs; index++) {
				processData[processGroupName][`${numprocs === 1 ? processGroupName : processGroupName + '_' + index}`] = {
					'status': 'STOPPED',
					'code': null,
					'signal': null,
					'pid': null,
					'cmd': processConfig[processGroupName].command,
					'time': null
				}
			}
		}
	})
}
