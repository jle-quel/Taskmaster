const jsonfile = require('jsonfile')
const joi = require('joi')

const signalCode = require('../signal-codes')

const envSchema = {"TEST": 'lol'}

const schema = joi.object().keys({
	command: joi.string().required(),
	numprocs: joi.number().integer().min(1).default(1),
	autostart: joi.boolean().default(true),
	stopwaitsecs: joi.number().integer().min(0).default(10),
	stdout_logfile: joi.string().default(null),
	stderr_logfile: joi.string().default(null),
	umask: joi.string().regex(/^[0-7]{1,3}$/).default('022'),
	autorestart: joi.string().valid(['always', 'never', 'unexpected']).default('unexpected'),
	startretries: joi.number().integer().min(0).default(3),
	directory: joi.string().default(null),
	startsecs: joi.number().integer().min(0).default(1),
	exitcodes: joi.alternatives().try(joi.array().items(joi.number().integer()), joi.number().integer()).default([0, 2]),
	env: joi.object().default(null),
	stopsignal: joi.number().integer().valid([
		signalCode.SIGTERM,
		signalCode.SIGINT,
		signalCode.SIGQUIT,
		signalCode.SIGHUP,
		signalCode.SIGUSR2
	]).default(signalCode.SIGTERM)
})

module.exports = (filePath) => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(filePath, (err, config) => {
			if (err) return reject(err)
			else if (joi.validate(config, joi.object().min(1)).error) return reject('Config file is empty')

			Promise.all(Object.keys(config).map((processName) => joi.validate(config[processName], schema)))
			.then((configParsed) => resolve(configParsed))
			.catch((err) => reject(err))
		})
	})
}