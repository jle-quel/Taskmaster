/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.go                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/23 18:43:38 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/26 17:18:59 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

package main

// import (
// 	"fmt"
// 	"golang.org/x/crypto/ssh/terminal"
// 	"os"
// 	"bufio"
// )
//

import (
	"fmt"
	"os/exec"
	"os"
	// "bytes"
)

func handleErr(err error) {
	if (err != nil) {
		fmt.Println(err)
		fmt.Println("Error")
	}
}
//
//
//
// func main() {
// 	fmt.Println("Taskmaster")
//
// 	oldState, err := terminal.MakeRaw(0)
// 	handleErr(err)
//
// 	reader := bufio.NewReader(os.Stdin)
// 	line := make([]rune, 0)
//
// 	for {
// 		char, _, err := reader.ReadRune()
// 		handleErr(err)
//
//
// 		if char == 'E' {
// 			break
// 		} else {
// 			line = append(line, char)
// 			fmt.Printf("%d", char)
// 		}
// 	}
//
// 	fmt.Printf("\n")
// 	for _, key := range line {
// 		fmt.Printf("%c", key)
// 	}
// 	terminal.Restore(0, oldState)
// }

func main() {

	cmd := exec.Command("tput", "cup", "0", "0")
	cmd := exec.Command(array)
	cmd.Stdout = os.Stdout
	cmd.Run()

}

// UP = 279165
// LE = 279168
// DO = 279166
// RI = 279167
// ENTER = 13
// DELETE = 127
