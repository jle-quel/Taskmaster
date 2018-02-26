/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/26 18:02:49 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/26 19:21:13 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

// I let you decide where and in what folder you want to place it
// PS: " < "
const basicHelp = (argv) => {
	console.log("Basic Help")
	console.log(`BUILTIN [${argv[0]}] ARGV [${argv[1]}]`)
}

const advanceHelp = (argv) => {
	console.log("Advance Help")
	console.log(`BUILTIN [${argv[0]}] ARGV [${argv[1]}]`)
}

/* ************************************************************************** */

if (process.argv.length !== 3) {
	console.error("usage: npm start || node path-to-index.js path-to-sample.conf")
	process.exit(1)
}

/* ************************************************************************** */

const readline = require("readline")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})
const functionByCmd = {
	"status": (argv) => {
		console.log("status")
		console.log(`BUILTIN [${argv[0]}] ARGV [${argv[1]}]`)
	},
	"start": (argv) => {
		console.log("start")
		console.log(`BUILTIN [${argv[0]}] ARGV [${argv[1]}]`)
	},
	"stop": (argv) => {
		console.log("stop")
		console.log(`BUILTIN [${argv[0]}] ARGV [${argv[1]}]`)
	},
	"restart": (argv) => {
		console.log("restart")
		console.log(`BUILTIN [${argv[0]}] ARGV [${argv[1]}]`)
	},
	"reload": (argv) => {
		console.log("reload")
		console.log(`BUILTIN [${argv[0]}] ARGV [${argv[1]}]`)
	},
	"shutdown": (argv) => {
		console.log("Shutdown")
		console.log(`BUILTIN [${argv[0]}] ARGV [${argv[1]}]`)
	},
	"help": (argv) => {
		argv.length === 1 ? basicHelp(argv) : advanceHelp(argv)
	}
}

/* ************************************************************************** */

process.stdout.write("Taskmaster> ")
rl.on("line", (line) => {
	const array = line.trim().split(" ")
	
	!functionByCmd[array[0]] ? console.error(`*** Unknown syntax: ${array[0]}`) :
	functionByCmd[array[0]](array)

	process.stdout.write("Taskmaster> ")
})