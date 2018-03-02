/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   launch.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/28 18:50:02 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/02 17:20:47 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const child_process = require('child_process')
const colors = require('colors')

/* ************************************************************************** */
/*								PRIVATE										  */
/* ************************************************************************** */

const auto = (obj) => {
	for (let key in obj) {
		if (obj[key].autostart === true) {
			for (let index = 0; index < obj[key].numprocs; index++) {
				let launcher = child_process.fork("./child", [obj[key].cmd])
				
				launcher.on("message", (msg) => {
					console.log(`Code [${msg.code}]`.yellow)
					console.log(`Signal [${msg.signal}]`.yellow)
					console.log(`PID [${msg.pid}]`.yellow)
					console.log(`MSG [${msg.msg}]`.yellow)
				})
			}
		}
	}
}

/* ************************************************************************** */
/*								PUBLIC										  */
/* ************************************************************************** */

module.exports = {
	auto
}