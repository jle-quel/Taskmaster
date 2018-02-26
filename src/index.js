/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/26 18:02:49 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/26 18:42:49 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Taskmaster> "
})

rl.prompt()

rl.on('line', (line) => {
	const trimmedLine = line.trim()

	switch trimmedLine {
		case: "status"
			console.log("Status")
		case: "start"
			console.log("Status")
		case: "stop"
			console.log("Stop")
		case: "restart"
			console.log("Restart")
		case: "reload"
			console.log("Reload")
		case: "shutdown"
			console.log("Shutdown")
	}
	rl.prompt()
})
