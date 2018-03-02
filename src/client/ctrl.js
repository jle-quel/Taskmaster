/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ctrl.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/26 18:02:49 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/02 13:50:40 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const readline = require("readline")
const help = require("./help")
const colors = require("colors")

/* ************************************************************************** */
/*								PRIVATE										  */
/* ************************************************************************** */


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "taskmaster> "
})

const functionByCmd = {
	"status": (argv) => {
		console.log(`STATUS BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`.green)
	},
	"start": (argv) => {
		console.log(`START BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`.green)
	},
	"stop": (argv) => {
		console.log(`STOP BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`.green)
	},
	"restart": (argv) => {
		console.log(`RESTART BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`.green)
	},
	"reload": (argv) => {
		console.log(`RELOAD BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`.green)
	},
	"shutdown": (argv) => {
		console.log(`SHUTDOWN BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`.green)
	},
	"help": (argv) => {
		console.log(`HELP BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`.green)		
		argv.length === 1 ? help.Basic(argv) : help.Advance(argv)
	},
	"error": (argv) => {
		console.log(`ERROR BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`.red)
		console.error(`*** Unknown syntax: ${argv[0]}`)
	}
}

const ctrl = () => {
	rl.prompt()
	rl.on("line", (line) => {
		const argv = line.trim().split(" ")
	
		if (!functionByCmd[argv[0]])
			functionByCmd["error"](argv)
		else
			functionByCmd[argv[0]](argv)
		
		rl.prompt()
	})
}

ctrl()

/* ************************************************************************** */
/*								PUBLIC										  */
/* ************************************************************************** */

module.exports = {
	ctrl
}