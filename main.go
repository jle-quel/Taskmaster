/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.go                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/23 18:43:38 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/23 20:08:14 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

package main

import (
	"os"
	"bufio"
	"fmt"
	"golang.org/x/crypto/ssh/terminal"
	"os/exec"
	"bytes"
)

func handleErr(err error) {
	if (err != nil) {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

// func main() {
//     cmd := exec.Command("tput", "-S")
//     cmd.Stdin = bytes.NewBufferString("clear\ncup 5 200")
//     cmd.Stdout = os.Stdout
//     cmd.Run()
//     fmt.Println("Hello")
// }

func main() {
	oldState, err := terminal.MakeRaw(0)
	handleErr(err)

	for {
		reader := bufio.NewReader(os.Stdin)
		char, _, _ := reader.ReadRune()
		fmt.Printf("%c", char)

		if (char == 'e') {
			break
		}

		cmd := exec.Command("tput", "-S")
		cmd.Stdin = bytes.NewBufferString("cup 0 1")
		cmd.Stdout = os.Stdout
		cmd.Run()
	}

	terminal.Restore(0, oldState)
}
