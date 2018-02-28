/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/28 18:06:44 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/28 18:38:55 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const { init } = require("./init")
const { ctrl } = require("./ctrl")

/* ************************************************************************** */
/*								ENTRY										  */
/* ************************************************************************** */

if (process.argv.length !== 3) {
	console.error("usage: node [path-to-index.js] [path-to-config.json]")
	process.exit(1)
}

init(process.argv[2])
	.then((obj) => {
		console.log(obj) // DEBUG
		console.log("\n") // DEBUG
		
		ctrl()
	})
	.catch((err) => console.error(err))