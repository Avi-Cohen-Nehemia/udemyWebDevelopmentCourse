((d) => {
    
    /*
    // fadeOut
    $("button").on("click", () => {
        // you can specify time and something to happen when its done like removing the element
        $("div").fadeOut(1000, () => {
            $("div").remove();
        });
    });
    */

    /*
    // fadeIn
    $("button").on("click", () => {
        $("div").fadeIn();
    });
    */

    /*
    // fadeToggle
    $("button").on("click", () => {
        $("div").fadeToggle(500);
    });
    */

    /*
    // slideDown
    $("button").on("click", () => {
        $("div").slideDown();
    });
    */

    /*
    // slideUp
    $("button").on("click", () => {
        $("div").slideUp();
    });
    */
   
    // slideToggle
    $("button").on("click", () => {
        $("div").slideToggle(1000, () => {
            console.log("slide is done!");
        });
    });
    
})(document);