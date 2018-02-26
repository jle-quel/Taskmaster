/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.go                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/23 18:43:38 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/26 16:19:51 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

package main

import (
	"fmt"
	"golang.org/x/crypto/ssh/terminal"
	"os"
	"bufio"
)

func handleErr(err error) {
	if (err != nil) {
		fmt.Println(err)
	}
}

func main() {
	fmt.Println("Taskmaster")

	oldState, err := terminal.MakeRaw(0)
	handleErr(err)

	reader := bufio.NewReader(os.Stdin)
	line := make([]rune, 0)

	for {
		char, _, err := reader.ReadRune()
		handleErr(err)

		if char == 'E' {
			break
		} else {
			line = append(line, char)
			fmt.Printf("%c", char)
		}
	}

	fmt.Printf("\n")
	for _, key := range line {
		fmt.Printf("%c", key)
	}
	terminal.Restore(0, oldState)
}
