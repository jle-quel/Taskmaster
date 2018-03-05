const jsonfile = require('jsonfile')

module.exports = (filePath) => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(filePath, (err, res) => {
			if (err) reject(err)

			for (const key in res) {
				if (typeof res[key].cmd !== 'string') reject(err)
				if (typeof res[key].numprocs !== 'number') reject(err)
				if (typeof res[key].umask !== 'number') reject(err)
				if (typeof res[key].workingdir !== 'string') reject(err)
				if (typeof res[key].autostart !== 'boolean') reject(err)
				if (typeof res[key].autorestart !== 'string') reject(err)
				if (typeof res[key].exitcode !== 'number') reject(err)
				if (typeof res[key].startretries !== 'number') reject(err)
				if (typeof res[key].starttime !== 'number') reject(err)
				if (
					typeof res[key].stopsignal !== 'number' &&
					res[key].stopsignal < 1 && res[key].stopsignal > 31
				) reject(err)
				if (typeof res[key].stoptime !== 'number') reject(err)
				if (typeof res[key].stderr !== 'string') reject(err)
				if (typeof res[key].stdout !== 'string') reject(err)
				if (typeof res[key].env !== 'object') reject(err)
			}
			resolve(res)
		})
	})
}