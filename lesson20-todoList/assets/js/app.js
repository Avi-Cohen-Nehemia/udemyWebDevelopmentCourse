((d) => {

    // check/uncheck specific items as completed
    // we are using the "on" method and specifying "li" after "click" to take into account any future list items that we will add
    $(".list").on("click", "li", function() {
        $(this).toggleClass("completed");
    });

    // delete a specific item from the list
    $(".list").on("click", ".removeItem", function(e){
        // fadeOut the item
        $(this).parent().fadeOut(400, function() {
            // remove the item when it finished fading
            $(this).remove();
        });
        // use stopPropagtion to prevent bubbling
        e.stopPropagation();
    });

    // add a new item to the list
    $("input[type='text']").on("keypress", function(e) {

        // if 'enter' was pressed
        if (e.which === 13) {
            // save the text value
            let itemText = $(this).val();
            // append a new li with the value above
            $(".list").append("<li>"+itemText+" <span>X</span></li>");
            // add the class removeItem to the span
            $(".list li span").last().addClass("removeItem");
            // clear the input
            $(this).val("");
        }
    });

})(document);