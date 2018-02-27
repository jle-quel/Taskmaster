/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   logger.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/27 02:41:59 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/27 03:21:43 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const fs = require("fs")
const colors = require("colors")

const PATH = "/tmp/.logger"

const Debug = (str) => {
    fs.writeFile(PATH, str.green, (err) => {
        if (err) {            

        }
    })
}

const Fatal = (str) => {
    fs.writeFile(PATH, str.red, (err) => {
        if (err) {            

        }
    })
}

/* ************************************************************************** */

module.exports = {
    Debug,
    Fatal,
}
