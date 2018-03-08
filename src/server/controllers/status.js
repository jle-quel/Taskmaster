'use strict'

const processData = require('../process-data').getAll()
const getByProcessName = require('../process-data').getByProcessName

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

const all = () => {
	const status = []

	Object.keys(processData).map((processGroupName) => {
		const processGroupLength = Object.keys(processData[processGroupName]).length

		Object.keys(processData[processGroupName]).map((processName) => {
			const _process = processData[processGroupName][processName]
			const time = getUpTime(_process.time)

			if (_process.status !== 'STARTING' && (_process.status !== 'STOPPED' && _process.pid)) {
					status.push(`${processGroupLength === 1 ? '' : processGroupName + ':'}${processName}\t${_process.status}\t\tpid ${_process.pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
			} else status.push(`${processGroupLength === 1 ? '' : processGroupName + ':'}${processName}\t${_process.status}\t\t${_process.status === 'STOPPED' && !_process.pid ? 'Not started': ''}`)
		})
	})
	return Promise.resolve(status.join('\n'))
}

const one = (processNamesOrGroupName) => {
	const status = []

	processNamesOrGroupName.map((processNameOrGroupName) => {
		if (processData[processNameOrGroupName]) {
			const processGroupLength = Object.keys(processData[processNameOrGroupName]).length
		
			Object.keys(processData[processNameOrGroupName]).map((processName) => {
				const _process = processData[processNameOrGroupName][processName]
				const time = getUpTime(_process.time)

				if (_process.status !== 'STARTING' && (_process.status !== 'STOPPED' && _process.pid)) {
					status.push(`${processGroupLength === 1 ? '' : processNameOrGroupName + ':'}${processName}\t${_process.status}\t\tpid ${_process.pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
				} else status.push(`${processGroupLength === 1 ? '' : processGroupName + ':'}${processName}\t${_process.status}\t\t${_process.status === 'STOPPED' && !_process.pid ? 'Not started': ''}`)
			})
		}
		else {
			const processInfos = getByProcessName(processNameOrGroupName)

			if (processInfos) {
				const processDataFound = processInfos[1]
				const time = getUpTime(processDataFound.time)
				
				if (processDataFound.status !== 'STARTING') {
					status.push(`${processNameOrGroupName}\t${processDataFound.status}\t\tpid ${processDataFound.pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
				} else status.push(`${processNameOrGroupName}\t${processDataFound.status}\t\t${processDataFound.status === 'STOPPED' && !processDataFound.pid ? 'Not started': ''}`)
			} else status.push(`${processNameOrGroupName}: ERROR (no such process)`)
		}
	})
	return Promise.resolve(status.join('\n'))
}

module.exports = {
	all,
	one
}