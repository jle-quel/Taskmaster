'use strict'

const processData = require('./process').data
const processConfig = require('./process-config').get()
const _process = require('./process')

const getUpTime = (time) => {
	const timeDiff = Date.now() - time
	const secondesCalcul = parseInt((timeDiff / 1000) % 60)
	const minutesCalcul = parseInt((timeDiff / (1000 * 60)) % 60)
	const hoursCalcul = parseInt((timeDiff / (1000 * 60 * 60)) % 24)
	const secondes = secondesCalcul >= 10 ? secondesCalcul % 60 : `0${secondesCalcul}`
	const minutes = minutesCalcul >= 10 ? minutesCalcul % 60 : `0${minutesCalcul}`
	const hours = hoursCalcul >= 10 ? hoursCalcul % 60 : `0${hoursCalcul}`

	return [hours, minutes, secondes]
}

const getProcessData = (processNameToFind) => {
	for (const processGroupName in processData) {
		if (Object.keys(processData[processGroupName]).includes(processNameToFind)) return processData[processGroupName][processNameToFind]
	}
	return null
}

const status = (processNamesOrGroupName) => {
	const status = []

	if (!processNamesOrGroupName) {
		Object.keys(processData).map((processGroupName) => {
			const processGroupLength = Object.keys(processData[processGroupName]).length

			Object.keys(processData[processGroupName]).map((processName) => {
				const time = getUpTime(processData[processGroupName][processName].time)

				if (processData[processGroupName][processName].status !== 'STARTING') {
						status.push(`${processGroupLength === 1 ? '' : processGroupName + ':'}${processName}		${processData[processGroupName][processName].status} 	pid ${processData[processGroupName][processName].pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
				} else status.push(`${processGroupLength === 1 ? '' : processGroupName + ':'}${processName}		${processData[processGroupName][processName].status}`)
			})
		})
	}
	 else {
		processNamesOrGroupName.map((processNameOrGroupName) => {
			if (processData[processNameOrGroupName]) {
				const processGroupLength = Object.keys(processData[processNameOrGroupName]).length
			
				Object.keys(processData[processNameOrGroupName]).map((processName) => {
					const time = getUpTime(processData[processNameOrGroupName][processName].time)

					if (processData[processNameOrGroupName][processName].status !== 'STARTING') {
						status.push(`${processGroupLength === 1 ? '' : processNameOrGroupName + ':'}${processName}		${processData[processNameOrGroupName][processName].status} 	pid ${processData[processNameOrGroupName][processName].pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
					} else status.push(`${processGroupLength === 1 ? '' : processNameOrGroupName + ':'}${processName}		${processData[processNameOrGroupName][processName].status}`)
				})
			}
			else {
				const processDataFound = getProcessData(processNameOrGroupName)
			
				if (processDataFound) {
					if (processDataFound.status !== 'STARTING') {
						status.push(`${processNameOrGroupName}		${processDataFound.status} 	pid ${processDataFound.pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
					} else status.push(`${processNameOrGroupName}		${processDataFound.status}`)
				} else status.push(`${processNameOrGroupName}: ERROR (no such process)`)
			}
		})
	}
	return status.join('\n')
}

const start = require('./controllers/start')

module.exports = {
	'status': (processNamesOrGroupName) => {
		if (processNamesOrGroupName.length === 0 || processNamesOrGroupName[0] === 'all') return status(null)
		else return status(processNamesOrGroupName)
	},
	'start': (argv) => {
		return argv[0] === "all" ? start.AllProcess() : start.OneProcess(argv)
	},
	'stop': (argv, socket) => {
		console.log(argv)
	},
	'restart': (argv, socket) => {
		console.log(argv)
	},
	'reload': (argv, socket) => {
		console.log(argv)
	},
	'shutdown': (argv, socket) => {
		console.log(argv)
	},
}
