/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/26 18:02:49 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/26 18:26:40 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const readline = require("readline")

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on("keypress", (char) => {
	if (char === 'E') process.exit(42)
})
