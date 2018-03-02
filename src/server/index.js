/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/28 18:06:44 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/02 16:16:23 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const colors = require("colors")
const net = require("net")
const jsonfile = require('jsonfile')

const controller = require("./controller")
const launch = require("./launch")

/* ************************************************************************** */
/*								ENTRY										  */
/* ************************************************************************** */

if (process.argv.length !== 3) {
	console.log("Usage: node src/server/index.js [config.json]")
	process.exit(1)
}

jsonfile.readFile(process.argv[2], (err, obj) => {
	if (err) {
		console.error("500".red)
	} else {
		console.log("200".green)
		launch.auto(obj)		
	}
})

// const server = net.createServer((socket) => {
// 	console.log(`New connection from ${socket.remoteAddress}:${socket.remotePort}`.green)
	
// 	socket.on("data", (data) => {
// 		const cmd = JSON.parse(data)
// 		controller[cmd[0]](cmd, socket)
// 	})
	
// 	socket.on("close", () => {
// 		console.log(`Lost connection from ${socket.remoteAddress}:${socket.remotePort}`.red)		
// 	})
// }).listen(8000)