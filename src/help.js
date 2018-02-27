/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   help.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/27 03:07:10 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/27 03:44:03 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const logger = require("./logger")

const Basic = (argv) => {
    logger.Debug(`BASIC HELP BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
    console.log("\ndefault commands (type help <topic>):")
    console.log("=====================================")
    console.log("status\t\tstart\t\tstop")
    console.log("restart\t\treload\t\tshutdown\n")
}

const Advance = (argv) => {
	logger.Debug(`ADVANCE HELP BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
}

/* ************************************************************************** */

module.exports = {
    Basic,
    Advance
}