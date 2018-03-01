/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   launch.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/28 18:50:02 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/01 17:21:55 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const child_process = require('child_process')
const colors = require('colors')

/* ************************************************************************** */
/*								PRIVATE										  */
/* ************************************************************************** */

const getCommand = (cmd) => {
	return cmd.split(" ")
}

const launch = (obj) => {
	console.log(`Parent PID [${process.pid}]`.green)
	console.log(`Parent PPID [${process.ppid}]`.green)

	// for (let key in obj) {
		const cmd = getCommand(obj["_1"].cmd)

		const args = cmd.filter((elem, index) => {
			if (index >= 1) return true
			return false
		})

		console.log("**", args)
		let launcher = child_process.fork("./child", [cmd[0], args])

		console.log(`Launcher PID [${launcher.pid}]`.green)
		console.log(`Launcher PPID [${process.ppid}]`.green)
		
		launcher.on("message", (msg) => {
			console.log(`Code [${msg.code}]`.yellow)
			console.log(`Signal [${msg.signal}]`.yellow)
			console.log(`PID [${msg.pid}]`.yellow)
			console.log(`MSG [${msg.msg}]`.yellow)
		})
	// }	
}

/* ************************************************************************** */
/*								PUBLIC										  */
/* ************************************************************************** */

module.exports = {
	launch
}