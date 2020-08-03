((d) => {

    let items = d.querySelectorAll("li");

    for (let i = 0; i < items.length; i += 1) {

        //event for once element got hovered over
        items[i].addEventListener("mouseover", () => {
            items[i].style.color = "green";
        });
        
        //event for once element stpped being hovered over
        items[i].addEventListener("mouseout", () => {
            items[i].style.color = "black";
        });

        //cross out a job after completion
        items[i].addEventListener("click", () => {
            items[i].classList.toggle("done");
        });
    }

})(document);