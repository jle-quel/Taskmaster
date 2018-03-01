/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/28 18:06:44 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/01 17:21:57 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const { init } = require("./init")
const { launch } = require("./launch")

/* ************************************************************************** */
/*								ENTRY										  */
/* ************************************************************************** */

if (process.argv.length !== 3) {
	console.error("usage: node [path-to-index.js] [path-to-config.json]")
	process.exit(1)
}

init(process.argv[2])
	.then((obj) => {
		launch(obj)
	})
	.catch((err) => {
		console.error(err)
	})