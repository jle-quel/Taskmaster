"use strict"

const Basic = (argv) => {
    console.log(`BASIC HELP BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
    console.log("\ndefault commands (type help <topic>):")
    console.log("=====================================")
    console.log("status\t\tstart\t\tstop")
    console.log("restart\t\treload\t\tshutdown\n")
}

const Advance = (argv) => {
	console.log(`ADVANCE HELP BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
}

module.exports = {
    Basic,
    Advance
}