((d) => {

    // check/uncheck specific items as completed
    $("li").on("click", function(){
        if ($(this).css("color") !== "rgb(128, 128, 128)") {
            $(this).css({
                color: "gray",
                textDecoration: "line-through",
            });
        } else {
            $(this).css({
                color: "black",
                textDecoration: "none",
            });
        }
    });

})(document);