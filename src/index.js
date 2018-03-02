/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/28 18:06:44 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/02 13:12:02 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const { init } = require("./init")
const { launch } = require("./launch")
const colors = require("colors")

/* ************************************************************************** */
/*								ENTRY										  */
/* ************************************************************************** */

if (process.argv.length !== 3) {
	console.error("usage: node [path-to-index.js] [path-to-config.json]")
	process.exit(1)
}

console.log(`Parent PID [${process.pid}]`.green)
console.log(`Parent PPID [${process.ppid}]\n`.green)

init(process.argv[2])
	.then((obj) => {
		console.error("Ok".green)
		console.log(obj)
	})
	.catch((err) => {
		console.error("Error".red)
	})