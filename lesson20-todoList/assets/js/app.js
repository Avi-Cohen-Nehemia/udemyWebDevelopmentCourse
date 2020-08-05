((d) => {

    // check/uncheck specific items as completed
    $("li").on("click", function(){
        $(this).toggleClass("completed");
    });

})(document);