((d) => {

    let colors = [
        "rgb(255, 0, 0)",
        "rgb(255, 255, 0)",
        "rgb(0, 255, 0)",
        "rgb(0, 255, 255)",
        "rgb(0, 0, 255)",
        "rgb(255, 0, 255)",
    ]


    let squares = d.querySelectorAll(".square");

    // change all squares to the pickedColor
    let changeColors = (color) => {
        for (let i = 0; i < squares.length; i += 1) {
            squares[i].style.backgroundColor = color;
        }
    }

    // add initial colors to the squares
    for (let i = 0; i < squares.length; i += 1) {
        squares[i].style.backgroundColor = colors[i];     

        // add a click listener to the squares
        squares[i].addEventListener("click", () => {

            //compare the clicked color to pickedColor 
            let clickedColor = squares[i].style.backgroundColor

            if (clickedColor === pickedColor) {
                message.textContent = "Correct!";
                changeColors(clickedColor);
            } else {
                squares[i].style.backgroundColor = "#232323";
                message.textContent = "Try again!";
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

    let message = d.getElementById("message");

})(document);