((d) => {

    // check/uncheck specific items as completed
    $("li").on("click", function() {
        $(this).toggleClass("completed");
    });

    // delete a specific item from the list
    $(".delete").on("click", function(e){

        // fadeOut the item
        $(this).parent().fadeOut(400, function() {
            
            // remove the item when it finished fading
            $(this).remove();
        });

        // use stopPropagtion to prevent bubbling
        e.stopPropagation();
    });

})(document);