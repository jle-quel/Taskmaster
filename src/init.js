/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   init.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/28 17:48:50 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/28 18:55:16 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const jsonfile = require('jsonfile')

/* ************************************************************************** */
/*								PRIVATE										  */
/* ************************************************************************** */

const init = (file) => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(file, (err, obj) => {
			err ? reject(err) :resolve(obj)
		})
	})
}
/* ************************************************************************** */
/*								PUBLIC										  */
/* ************************************************************************** */

module.exports = {
	init
}