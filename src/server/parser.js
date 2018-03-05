const jsonfile = require('jsonfile')

module.exports = (filePath) => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(filePath, (err, config) => {
			if (err) reject(err)

			for (const processName in config) {
				if (typeof config[processName].command !== 'string' || config[processName].command.length === 0) reject(err)
				if (typeof config[processName].numprocs !== 'number' || config[processName].numprocs < 1) reject(err)
				if (typeof config[processName].directory !== 'string' || config[processName].directory.length === 0) reject(err)
				if (typeof config[processName].autostart !== 'boolean') reject(err)
				if (
					typeof config[processName].autorestart !== 'string' ||
					(config[processName].autorestart !== 'always'&&
					config[processName].autorestart !== 'never' &&
					config[processName].autorestart !== 'unexpected')
				) reject(err)
				if (Array.isArray(config[processName].exitcodes) && config[processName].exitcodes.length > 0) {
					config[processName].exitcodes.forEach(element => { if (typeof element !== 'number') reject(err) })
				}
				else if (typeof config[processName].exitcodes !== 'number') reject(err)
				if (typeof config[processName].startretries !== 'number' && config[processName].startretries > -1) reject(err)
				if (typeof config[processName].startsecs !== 'number') reject(err)
				if (
					typeof config[processName].stopsignal !== 'number' ||
					![15, 1, 2, 3, 4, 30, 31].includes(config[processName].stopsignal)
				) reject(err)
				if (typeof config[processName].stopwaitsecs !== 'number' && config[processName].stopwaitsecs > -1) reject(err)
				if (typeof config[processName].stderr !== 'string') reject(err)
				if (typeof config[processName].stdout !== 'string') reject(err)
				if (typeof config[processName].env !== 'object') reject(err)
				if (typeof config[processName].umask !== 'string' || parseInt(config[processName].umask) < 0 || parseInt(config[processName].umask) > 777) reject(err)
			}
			resolve(config)
		})
	})
}