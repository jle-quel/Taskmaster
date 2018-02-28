/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/28 18:06:44 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/28 22:58:41 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const { init } = require("./init")
const { launch } = require("./launch")
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
		// launch(obj)
		ctrl()
	})
	.catch((err) => {
		console.error(err)
	})