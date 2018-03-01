/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   child.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/03/01 15:41:57 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/01 17:21:53 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const child_process = require('child_process')
const colors = require('colors')


const args = process.argv[3].split(',')
console.log(args)
const _process = child_process.spawn(process.argv[2], args)

console.log(`Child PID [${_process.pid}]`.blue)
console.log(`Child PPID [${process.ppid}]`.blue)

_process.on("exit", (code, signal) => {
    process.send({
        "code": code,
        "signal": signal,
        "pid": _process.pid,
        "msg": true
    })
})