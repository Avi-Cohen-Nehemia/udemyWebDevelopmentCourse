((d) => {

    let colors = [];
    let pickedColor;
    let header = d.querySelector("h1");
    let message = d.getElementById("message");
    let modeButtons = d.querySelectorAll(".mode");

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

    // reset game and values
    let reset = () => {
        // generate new random colors array
        colors = generateRandomColors(numSquares);

        // pick a new correct answer
        pickedColor = pickColor();

        // display new correct answer
        colorDisplay.textContent = pickedColor;

        // change the squares to reflect the new colors
        for (let i = 0; i < squares.length; i += 1) {
            if (colors[i]) {
                squares[i].style.display = "block";
                squares[i].style.backgroundColor = colors[i];
            } else {
                squares[i].style.display = "none";
            }  
        }

        // reset the header's color and texts
        header.style.backgroundColor = "steelblue";
        message.textContent = "";
        resetBtn.textContent = "New Colors";
    }

    // pick a random color out of the colors array as the "pickedColor"
    let pickColor = () => {
        let random = Math.floor(Math.random() * colors.length);
        return colors[random];
    }

    let numSquares = 6;

    // set text to display the rgb values of the pickedColor
    let colorDisplay = d.getElementById("colorDisplay");
    colorDisplay.textContent = pickedColor;

    // change all squares to the pickedColor
    let squares = d.querySelectorAll(".square");

    let changeColors = (color) => {
        for (let i = 0; i < squares.length; i += 1) {
            squares[i].style.backgroundColor = color;
        }
    };

    // reset button
    let resetBtn = d.getElementById("resetBtn");
    resetBtn.addEventListener("click",() => {
        reset();
    });

    const init = () => {
        for (let i = 0; i < modeButtons.length; i += 1) {
            modeButtons[i].addEventListener("click",() => {
                modeButtons[0].classList.remove("selected");
                modeButtons[1].classList.remove("selected");
                modeButtons[i].classList.add("selected");
    
                modeButtons[i].textContent === "Easy" ? numSquares = 3 : numSquares = 6;
    
                reset();
            })
        }

        for (let i = 0; i < squares.length; i += 1) {

            // add a click listener to the squares
            squares[i].addEventListener("click", () => {
    
                //compare the clicked color to pickedColor 
                let clickedColor = squares[i].style.backgroundColor
    
                if (clickedColor === pickedColor) {
                    message.textContent = "Correct!";
                    changeColors(clickedColor);
                    header.style.backgroundColor = clickedColor;
                    resetBtn.textContent = "Play Again?"
                } else {
                    squares[i].style.backgroundColor = "#232323";
                    message.textContent = "Try Again";
                }
            })
        }

        reset();
    };

    init();

})(document);