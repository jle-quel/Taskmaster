/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/26 18:02:49 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/27 03:44:42 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

if (process.argv.length !== 3) {
	console.error("usage: npm start || node path-to-index.js path-to-sample.conf")
	process.exit(1)
}

/* ************************************************************************** */

const readline = require("readline")
const logger = require("./logger")
const help = require("./help")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "Taskmaster> "
})
const functionByCmd = {
	"status": (argv) => {
		logger.Debug(`STATUS BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
	},
	"start": (argv) => {
		logger.Debug(`START BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
	},
	"stop": (argv) => {
		logger.Debug(`STOP BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
	},
	"restart": (argv) => {
		logger.Debug(`RESTART BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
	},
	"reload": (argv) => {
		logger.Debug(`RELOAD BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
	},
	"shutdown": (argv) => {
		logger.Debug(`SHUTDOWN BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
	},
	"help": (argv) => {
		logger.Debug(`HELP BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)		
		argv.length === 1 ? help.Basic(argv) : help.Advance(argv)
	},
	"error": (argv) => {
		logger.Debug(`ERROR BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
		console.error(`*** Unknown syntax: ${argv[0]}`)
	}
}

/* ************************************************************************** */

rl.prompt()
rl.on("line", (line) => {
	const argv = line.trim().split(" ")
	
	if (!functionByCmd[argv[0]]) functionByCmd["error"](argv)
	else functionByCmd[argv[0]](argv)
	
	rl.prompt()
})
