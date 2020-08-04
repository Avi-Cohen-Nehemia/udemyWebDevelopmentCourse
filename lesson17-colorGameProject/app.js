((d) => {

    // generate a random RGB color
    let randomColor = () => {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);

        return `rgb(${red}, ${green}, ${blue})`;
    }

    // make an array with "num" random colors
    let generateRandomColors = (num) => {
        let arr = []
        for (let i = 0; i < num; i += 1) {
            arr.push(randomColor());
        }
        return arr;
    }

    let numSquares = 6;

    // store the generated random colors array in a vaiable
    let colors = generateRandomColors(numSquares);

    // change all squares to the pickedColor
    let squares = d.querySelectorAll(".square");

    let changeColors = (color) => {
        for (let i = 0; i < squares.length; i += 1) {
            squares[i].style.backgroundColor = color;
        }
    }

    // add initial colors to the squares and give them click event
    let header = d.querySelector("h1");
    let message = d.getElementById("message");
    let reset = d.getElementById("reset");

    for (let i = 0; i < squares.length; i += 1) {
        squares[i].style.backgroundColor = colors[i];     

        // add a click listener to the squares
        squares[i].addEventListener("click", () => {

            //compare the clicked color to pickedColor 
            let clickedColor = squares[i].style.backgroundColor

            if (clickedColor === pickedColor) {
                message.textContent = "Correct!";
                changeColors(clickedColor);
                header.style.backgroundColor = clickedColor;
                reset.textContent = "Play Again?"
            } else {
                squares[i].style.backgroundColor = "#232323";
                message.textContent = "Try Again";
            }
        })
    }

    // pick a random color out of the colors array as the "pickedColor"
    let pickColor = () => {
        let random = Math.floor(Math.random() * colors.length);
        return colors[random];
    }
    let pickedColor = pickColor();

    // set text to display the rgb values of the pickedColor
    let colorDisplay = d.getElementById("colorDisplay");
    colorDisplay.textContent = pickedColor;

    // reset button functionality
    reset.addEventListener("click",() => {
        // generate new random colors array
        colors = generateRandomColors(numSquares);

        // pick a new correct answer
        pickedColor = pickColor();

        // display new correct answer
        colorDisplay.textContent = pickedColor;

        // change the squares to reflect the new colors
        for (let i = 0; i < squares.length; i += 1) {
            squares[i].style.backgroundColor = colors[i];
        }

        // reset the header's color and texts
        header.style.backgroundColor = "steelblue";
        message.textContent = "";
        reset.textContent = "New Colors";
    });

    // difficulty buttons
    let easyBtn = d.getElementById("easyBtn");
    let hardBtn = d.getElementById("hardBtn");

    easyBtn.addEventListener("click", () => {
        easyBtn.classList.add("selected");
        hardBtn.classList.remove("selected");
        message.textContent = "";

        numSquares = 3;
        colors = generateRandomColors(numSquares);
        pickedColor = pickColor();
        colorDisplay.textContent = pickedColor;

        for (let i = 0; i < squares.length; i += 1) {
            if (colors[i]) {
                squares[i].style.backgroundColor = colors[i];
            } else {
                squares[i].style.display = "none";
            }
        }
    });

    hardBtn.addEventListener("click", () => {
        hardBtn.classList.add("selected");
        easyBtn.classList.remove("selected");
        message.textContent = "";

        numSquares = 6;
        colors = generateRandomColors(numSquares);
        pickedColor = pickColor();
        colorDisplay.textContent = pickedColor;

        for (let i = 0; i < squares.length; i += 1) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        }
    });

})(document);