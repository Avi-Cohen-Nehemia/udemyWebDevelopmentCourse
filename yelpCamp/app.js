// import packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
const mongoose = require("mongoose");
require("dotenv/config");
// tell express to use body parser
app.use(bodyParser.urlencoded({extended: true}));
// make express process views as ejs files by default
app.set("view engine", "ejs");

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

// route for creating a new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("newCampground");
});

// route for showing all campground
app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

// home/landing page
app.get("/", (req, res) => {
    res.render("home");
});

// route for creating a new campground
app.post("/campgrounds", (req, res) => {
    // get the data from the form
    let name = req.body.name;
    let image = req.body.image;
    // add the new campground to the campgrounds array
    let newCampground = {
        name: name,
        image: image,
    }
    campgrounds.push(newCampground);
    // redirect to the campgrounds page
    res.redirect("/campgrounds");
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log('Connected to DB!'))
	.catch(error => console.log(error.message));

// set a port for the server to start on
app.listen(3000, () => {
    console.log("Yelp Camp app started on port 3000");
});