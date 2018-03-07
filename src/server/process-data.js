'use stirct'

let processData = {}

const get = () => {
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

module.exports = {
    get,
    init
}

