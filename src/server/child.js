/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   child.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/03/01 15:41:57 by jle-quel          #+#    #+#             */
/*   Updated: 2018/03/02 13:44:51 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

"use strict"

const child_process = require('child_process')
const colors = require('colors')

/* ************************************************************************** */
/*								PUBLIC										  */
/* ************************************************************************** */

const _process = child_process.spawn("echo $TEST", {
    shell: true,
    env: {
        TEST: "lol"
    }
})

console.log(`Child PID [${_process.pid}]`.blue)
console.log(`Child PPID [${process.ppid}]\n`.blue)

_process.stdout.on("data", (data) => {
    console.log(data.toString())
})

_process.stderr.on("data", (data) => {
    
})

_process.on("exit", (code, signal) => {
    process.send({
        "code": code,
        "signal": signal,
        "pid": _process.pid,
        "msg": true
    })
})