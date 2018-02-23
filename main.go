/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.go                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: jle-quel <jle-quel@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/02/23 18:43:38 by jle-quel          #+#    #+#             */
/*   Updated: 2018/02/23 19:12:09 by jle-quel         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

package main

// import (
// 	"fmt"
// 	"golang.org/x/crypto/ssh/terminal"
// 	"os"
// )
//
// func handleErr(err error) bool {
// 	if (err != nil) {
// 		fmt.Fprintln(os.Stderr, err)
// 		return (true)
// 	}
// 	return (false)
// }
//
// func main() {
// 	oldState, err := terminal.MakeRaw(0)
// 	handleErr(err)
// 	terminal.Restore(0, oldState)
//
// }



import (
    "bytes"
    "fmt"
    "os"
    "os/exec"
)

func main() {
    cmd := exec.Command("tput", "-S")
    cmd.Stdin = bytes.NewBufferString("clear\ncup 5 200")
    cmd.Stdout = os.Stdout
    cmd.Run()
    fmt.Println("Hello")
}
