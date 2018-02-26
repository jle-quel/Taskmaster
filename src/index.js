/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/26 18:02:49 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/26 19:21:13 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

'use strict'

if (process.argv.length !== 3) {
	console.error('usage: npm start || node path-to-index.js path-to-sample.conf')
	process.exit(1)
}

const readline = require('readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})
const functionByCmd = {
	'status': () => {console.log('status')},
	'start': () => {console.log('start')},
	'stop': () => {console.log('stop')},
	'restart': () => {console.log('restart')},
	'reload': () => {console.log('reload')},
	'shutdown': () => {console.log('shutdown')}
}

process.stdout.write('Taskmaster> ')
rl.on('line', (line) => {
	const trimmedLine = line.trim()

	!functionByCmd[trimmedLine] ? console.error(`*** Unknown syntax: ${trimmedLine}`) :
	functionByCmd[trimmedLine]()

	process.stdout.write('Taskmaster> ')
})
