'use stirct'

let procesConfig = {}

const get = () => {
    return procesConfig
}

const edit = (newConfig) => {
    for (const processName in newConfig) {
        for (const processNameValue in newConfig[processName]) {
            if (!procesConfig[processName]) procesConfig[processName] = newConfig[processName]
            procesConfig[processName][processNameValue] = newConfig[processName][processNameValue]
        }
    }
}

module.exports = {
    get,
    edit
}

