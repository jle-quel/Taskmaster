'use stirct'

let processData = {}

const getAll = () => {
    return processData
}

const init = (processConfig) => {
    Object.keys(processConfig).map((processGroupName) => {
        const numprocs = processConfig[processGroupName].numprocs
		if (!processData[processGroupName]) processData[processGroupName] = {}
			
        for (let index = 0; index < numprocs; index++) {
            processData[processGroupName][`${numprocs === 1 ? processGroupName : processGroupName + '_' + index}`] = {
                config: processConfig[processGroupName],
                'status': 'STOPPED',
                'code': null,
                'signal': null,
                'pid': null,
                'time': null
            }
        }
	})
}

const getByProcessName = (processName) => {
	for (const processGroupName in processData) {
        const processDataKeys = Object.keys(processData[processGroupName])
		if (processDataKeys.includes(processName)) {
			return [processGroupName, processData[processGroupName][processName], processDataKeys.indexOf(processName)]
		}
	}
	return null
}

module.exports = {
    getByProcessName,
    getAll,
    init
}

