((d) => {

    // change all divs background to purple
    $("div").css("background-color", "purple");

    // give all divs with class of highlight 200px width
    $(".highlight").css("width", "200px");

    // give the div with id of "third" an orange color
    $("#third").css("border", "2px solid orange");

    // change the text color of the first div to pink
    $("div:nth-child(1)").css("color", "pink");

})(document);