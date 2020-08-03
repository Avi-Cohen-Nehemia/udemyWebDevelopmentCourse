var secretNumber = 4;

var guess = Number(prompt("Guess a number between 1 and 10!"));

if (guess === secretNumber) {
	alert("Correct! You guessed it!");
}

else if (guess > secretNumber) {
	alert("Wrong... Too high, guess again!");
}

else {
	alert("Wrong... Too low, guess again!");
}