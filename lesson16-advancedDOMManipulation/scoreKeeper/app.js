((d) => {

    //Starting values setup
    let input = d.querySelector("input");
    let maxScore = input.value;
    let playingTo = d.getElementById("playingTo");
    playingTo.textContent = "Playing to: " + maxScore;

    input.addEventListener("change", () => {
        maxScore = +input.value;
        playingTo.textContent = "Playing to: " + maxScore;
    })


    //player 1 increment logic
    playerOneScore = 0;
    let score1 = d.getElementById("score1");
    score1.textContent = playerOneScore;
    let increment1 = d.getElementById("increment1")

    increment1.addEventListener("click", () => {
        if (playerOneScore !== maxScore && playerTwoScore !== maxScore) {
            playerOneScore += 1;
            score1.textContent = playerOneScore;
        }

        if (playerOneScore === maxScore) {
            score1.style.background = "green";
        }

        if (playerTwoScore === maxScore) {
            score2.style.background = "green";
        }
    });

    //player 2 increment logic
    playerTwoScore = 0;
    let score2 = d.getElementById("score2");
    score2.textContent = playerOneScore;
    let increment2 = d.getElementById("increment2");

    increment2.addEventListener("click", () => {
        if (playerOneScore !== maxScore && playerTwoScore !== maxScore) {
            playerTwoScore += 1;
            score2.textContent = playerTwoScore;
        }

        if (playerOneScore === maxScore) {
            score1.style.background = "green";
        }

        if (playerTwoScore === maxScore) {
            score2.style.background = "green";
        }
    });

    // reset button
    let reset = d.getElementById("reset");
    reset.addEventListener("click", () => {
        playerOneScore = 0;
        score1.textContent = playerOneScore;

        playerTwoScore = 0;
        score2.textContent = playerTwoScore;

        score1.style.background = "white";
        score2.style.background = "white";
    })

})(document);