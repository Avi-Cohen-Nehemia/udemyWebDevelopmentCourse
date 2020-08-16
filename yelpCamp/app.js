// import packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
// import mongoose and connect to db
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/yelp_camp')
	.then(() => console.log('Connected to DB!'))
	.catch(error => console.log(error.message));
// tell express to use body parser
app.use(bodyParser.urlencoded({extended: true}));
// make express process views as ejs files by default
app.set("view engine", "ejs");

// schema setup
let campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
});
// define a new oobject using the schema created above
let Campground = mongoose.model("campground", campgroundSchema);

// Campground.create(
// 	{
//     	name: "Salmon Creek",
//         image: "https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 		description: "This is a huge granite hill, no bathrooms, no water, just beautiful granite!"
//     },
// 	(error, campground) => {
// 		if(error) {
// 			console.log(error);
// 		} else {
// 			console.log("new campground added to the data base");
// 			console.log(campground);
// 		}
// 	});

// home/landing page
app.get("/", (req, res) => {
    res.render("home");
});

// INDEX route - show all campgrounds
app.get("/campgrounds", (req, res) => {
	Campground.find({}, (error, campgrounds) => {
		if(error) {
			console.log(error);
		} else {
			res.render("index", {campgrounds: campgrounds});
		}
	});
});

// NEW route - show the form to create new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

// CREATE rout - create a new campground
app.post("/campgrounds", (req, res) => {
    // get the data from the form
    let name = req.body.name;
    let image = req.body.image;
	let description = req.body.description;
    // add the new campground to the campgrounds array
    let newCampground = {
        name: name,
        image: image,
		description: description,
    }
    // Create a new campground using the data above and save it to the DB
	Campground.create(newCampground, (error, campground) => {
		if(error) {
			console.log(error);
		} else {
			// redirect to the campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

// SHOW rout - show more info about a specific campground
app.get("/campgrounds/:id", (req, res) => {
	// find the campground with provided id
	Campground.findById(req.params.id, (error, foundCampground) => {
		if(error) {
			console.log(error);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
});

// set a port for the server to start on
app.listen(3000, () => {
    console.log("Yelp Camp app started on port 3000");
});