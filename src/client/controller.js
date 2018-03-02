/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   controller.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/26 18:02:49 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/02 16:11:03 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const help = require("./help")
const colors = require("colors")

/* ************************************************************************** */
/*								PUBLIC										  */
/* ************************************************************************** */

module.exports = {
	"status": (argv, client) => {
		client.write(JSON.stringify(argv))
	},
	"start": (argv, client) => {
		client.write(JSON.stringify(argv))
	},
	"stop": (argv, client) => {
		client.write(JSON.stringify(argv))
	},
	"restart": (argv, client) => {
		client.write(JSON.stringify(argv))
	},
	"reload": (argv, client) => {
		client.write(JSON.stringify(argv))
	},
	"shutdown": (argv, client) => {
		client.write(JSON.stringify(argv))
	},
	"help": (argv, client) => {
		argv.length === 1 ? help.Basic(argv) : help.Advance(argv)
	},
	"error": (argv, client) => {
		console.error(`*** Unknown syntax: ${argv[0]}`)
	}
}