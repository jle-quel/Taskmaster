/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   controller.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/03/02 15:32:45 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/02 16:03:09 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const colors = require("colors")

/* ************************************************************************** */
/*								PUBLIC										  */
/* ************************************************************************** */

module.exports = {
	"status": (argv, socket) => {
		console.log(argv)
	},
	"start": (argv, socket) => {
		console.log(argv)
	},
	"stop": (argv, socket) => {
		console.log(argv)
	},
	"restart": (argv, socket) => {
		console.log(argv)
	},
	"reload": (argv, socket) => {
		console.log(argv)
	},
	"shutdown": (argv, socket) => {
		console.log(argv)
	},
}