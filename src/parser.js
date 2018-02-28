/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parser.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/28 16:41:52 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/28 17:04:31 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const readline = require('readline')
const fs = require('fs')

const parser = (path, callback) => {
	const ret = []
	
	const rl = readline.createInterface({
		input: fs.createReadStream(path)
	})

	rl.on("line", (line) => {
		ret.push(line)
	})

	rl.on("close", function () {
		callback(null, ret.join(""))
		rl.close()
	})
}

module.exports = {
    parser
}