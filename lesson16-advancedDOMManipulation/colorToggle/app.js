((d) => {

    let button = d.querySelector("button");

    let isPurple = false;

    let toggleBodyColor = () => {

        if (isPurple) {
            d.body.style.background = "white";
        } else {
            d.body.style.background = "purple"
        }

        isPurple = !isPurple;
    }

    button.addEventListener("click", toggleBodyColor);

    //another option using built-in toggle method
    // it checks if the element has a class and adds/removed it

    // button.addEventListener("click", () => {
    //     d.body.classList.toggle("purple")
    // })

})(document);