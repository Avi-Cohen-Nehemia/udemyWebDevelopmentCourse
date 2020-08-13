// import packages
const express = require("express");
const app = express();
const axios = require('axios');
// make express process views as ejs files by default
app.set("view engine", "ejs");

// home/landing page
app.get("/", (req, res) => {
    res.render("home");
});

// route for showing all campground
app.get("/campgrounds", (req, res) => {
    let campgrounds = [
        {
            name: "Salmon Creek",
            image: "https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        },
        {
            name: "Granite Hill",
            image: "https://images.unsplash.com/photo-1473713984581-b8918cc3652e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        },
        {
            name: "Mountain Goat's Rest",
            image: "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        },
    ];
    res.render("campgrounds", {campgrounds: campgrounds});
});

// set a port for the server to start on
app.listen(3000, () => {
    console.log("Yelp Camp app started on port 3000");
});