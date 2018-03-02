/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   launch.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/28 18:50:02 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/02 13:52:32 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const child_process = require('child_process')
const colors = require('colors')

/* ************************************************************************** */
/*								PRIVATE										  */
/* ************************************************************************** */

const auto = (obj) => {
	// for (let index = 0; index < obj[key].numprocs; index++) {
		// if (obj["ls"].autostart === true) {
			let launcher = child_process.fork("./child", [obj["ls"].cmd])
			
			console.log(`Launcher PID [${launcher.pid}]`.green)
			console.log(`Launcher PPID [${process.ppid}]\n`.green)
			
			launcher.on("message", (msg) => {
				console.log(`Code [${msg.code}]`.yellow)
				console.log(`Signal [${msg.signal}]`.yellow)
				console.log(`PID [${msg.pid}]`.yellow)
				console.log(`MSG [${msg.msg}]`.yellow)
			})
		// }
	// }
}

const cmd = () => {
		
}

/* ************************************************************************** */
/*								PUBLIC										  */
/* ************************************************************************** */

module.exports = {
	auto
}