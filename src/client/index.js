/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/03/02 14:22:18 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/02 15:27:40 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const net = require("net")
const colors = require("colors")
const readline = require("readline")
const controller = require("./controller")

/* ************************************************************************** */
/*								ENTRY										  */
/* ************************************************************************** */

const PORT = 8000
const HOST = "127.0.0.1"

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "taskmaster> "
})

const client = net.createConnection(PORT, HOST, () => {
	console.log(`Connected to ${HOST}:${PORT}\n`.green)
	
	rl.prompt()
	rl.on("line", (line) => {
		const argv = line.trim().split(" ")
	
		if (!controller[argv[0]])
			controller["error"](argv, client)
		else
			controller[argv[0]](argv, client)
		
		rl.prompt()
	})
})

client.on("data", (data) => {
	console.log(JSON.parse(data))
})

client.on("end", (end) => {
	console.log(`\nDisconnected from ${HOST}:${PORT}`.red)
	process.exit(0)
})