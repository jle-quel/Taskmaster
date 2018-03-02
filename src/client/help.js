/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   help.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/27 03:07:10 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/28 18:38:50 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const Basic = (argv) => {
    console.log(`BASIC HELP BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
    console.log("\ndefault commands (type help <topic>):")
    console.log("=====================================")
    console.log("status\t\tstart\t\tstop")
    console.log("restart\t\treload\t\tshutdown\n")
}

const Advance = (argv) => {
	console.log(`ADVANCE HELP BUILTIN [${argv[0]}] ARGV [${argv[1]}]\n`)
}

/* ************************************************************************** */

module.exports = {
    Basic,
    Advance
}