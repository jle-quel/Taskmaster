'use strict'

const process = require('../process')

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
		Object.keys(process.data).map((processGroupName) => {
			const processGroupLength = Object.keys(process.data[processGroupName]).length

			Object.keys(process.data[processGroupName]).map((processName) => {
				const time = getUpTime(process.data[processGroupName][processName].time)

				if (process.data[processGroupName][processName].status !== 'STARTING') {
						status.push(`${processGroupLength === 1 ? '' : processGroupName + ':'}${processName}\t${process.data[processGroupName][processName].status}\t\tpid ${process.data[processGroupName][processName].pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
				} else status.push(`${processGroupLength === 1 ? '' : processGroupName + ':'}${processName}\t${process.data[processGroupName][processName].status}`)
			})
		})
	}
	 else {
		processNamesOrGroupName.map((processNameOrGroupName) => {
			if (process.data[processNameOrGroupName]) {
				const processGroupLength = Object.keys(process.data[processNameOrGroupName]).length
			
				Object.keys(process.data[processNameOrGroupName]).map((processName) => {
					const time = getUpTime(process.data[processNameOrGroupName][processName].time)

					if (process.data[processNameOrGroupName][processName].status !== 'STARTING') {
						status.push(`${processGroupLength === 1 ? '' : processNameOrGroupName + ':'}${processName}\t${process.data[processNameOrGroupName][processName].status}\t\tpid ${process.data[processNameOrGroupName][processName].pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
					} else status.push(`${processGroupLength === 1 ? '' : processNameOrGroupName + ':'}${processName}\t${process.data[processNameOrGroupName][processName].status}`)
				})
			}
			else {
				const processDataFound = process.getOneData(processNameOrGroupName)
			
				if (processDataFound) {
					if (processDataFound.status !== 'STARTING') {
						status.push(`${processNameOrGroupName}\t${processDataFound.status}\t\tpid ${processDataFound.pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
					} else status.push(`${processNameOrGroupName}\t${processDataFound.status}`)
				} else status.push(`${processNameOrGroupName}: ERROR (no such process)`)
			}
		})
	}
	return status.join('\n')
}