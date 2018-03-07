'use strict'

const processData = require('../process-data').get()
const getOneData = require('../process').getOneData

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

module.exports = (processNamesOrGroupName) => {
	const status = []

	if (!processNamesOrGroupName) {
		Object.keys(processData).map((processGroupName) => {
			const processGroupLength = Object.keys(processData[processGroupName]).length

			Object.keys(processData[processGroupName]).map((processName) => {
				const time = getUpTime(processData[processGroupName][processName].time)

				if (processData[processGroupName][processName].status !== 'STARTING') {
						status.push(`${processGroupLength === 1 ? '' : processGroupName + ':'}${processName}\t${processData[processGroupName][processName].status}\t\tpid ${processData[processGroupName][processName].pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
				} else status.push(`${processGroupLength === 1 ? '' : processGroupName + ':'}${processName}\t${processData[processGroupName][processName].status}`)
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
						status.push(`${processGroupLength === 1 ? '' : processNameOrGroupName + ':'}${processName}\t${processData[processNameOrGroupName][processName].status}\t\tpid ${processData[processNameOrGroupName][processName].pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
					} else status.push(`${processGroupLength === 1 ? '' : processNameOrGroupName + ':'}${processName}\t${processData[processNameOrGroupName][processName].status}`)
				})
			}
			else {
				const processDataFound = getOneData(processNameOrGroupName)

				if (processDataFound) {
					const time = getUpTime(processDataFound.time)
					
					if (processDataFound.status !== 'STARTING') {
						status.push(`${processNameOrGroupName}\t${processDataFound.status}\t\tpid ${processDataFound.pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
					} else status.push(`${processNameOrGroupName}\t${processDataFound.status}`)
				} else status.push(`${processNameOrGroupName}: ERROR (no such process)`)
			}
		})
	}
	return status.join('\n')
}