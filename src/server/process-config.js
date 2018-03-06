'use stirct'

let processConfig = {ls: {command: 'toto'}}

const get = () => {
    return processConfig
}

const edit = (newProcessConfig) => {
    Object.keys(newProcessConfig).map((newProcessName) => {
        Object.keys(newProcessConfig[newProcessName]).map((newProcessConfigKey) => {
            processConfig[newProcessName] = newProcessConfig[newProcessName]
        })
    })
}

module.exports = {
    get,
    edit
}

