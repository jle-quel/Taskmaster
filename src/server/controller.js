'use strict'

const processData = require('./process').data

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

const status = (processNames) => {
	const status = []

	if (!processNames) {
		Object.keys(processData).map((processName) => {
			const time = getUpTime(processData[processName].time)
			
			if (processData[processName].status !== 'STARTING') {
				status.push(`${processName}		${processData[processName].status} 	pid ${processData[processName].pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
			} else status.push(`${processName}		${processData[processName].status}`)
		})
	} else {
		processNames.map((processName) => {
			if (processData[processName]) {
				const time = getUpTime(processData[processName].time)

				if (processData[processName].status !== 'STARTING') {
					status.push(`${processName}		${processData[processName].status} 	pid ${processData[processName].pid}, uptime ${time[0]}:${time[1]}:${time[2]}`)
				} else status.push(`${processName}		${processData[processName].status}`)
			} else status.push(`${processName}: ERROR (no such process)`)
		})
	}
	return status.join('\n')
}

module.exports = {
	'status': (processNames) => {
		if (processNames.length === 0 || processNames[0] === 'all') return status(null)
		else return status(processNames)
	},
	'start': (argv, socket) => {
		console.log(argv)
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