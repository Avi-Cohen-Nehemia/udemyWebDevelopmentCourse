//version 1

// var answer = prompt ("Are we there yet?");

// while (answer !== "yes" && answer !== "yeah"){
// 	var answer = prompt ("Are we there yet?");
// }

// alert ("Yay! we're finally there!");




//version 2

var answer = prompt ("Are we there yet?");
while (answer.indexOf("yes") === -1){
	var answer = prompt ("Are we there yet?");
}

alert ("Yay! we're finally there!");