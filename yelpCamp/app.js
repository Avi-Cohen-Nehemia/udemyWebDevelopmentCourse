// ==========================
//          SETUP
// ==========================
// import packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const axios = require('axios');
// import models
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
// import mongoose and connect to db
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/yelp_camp')
	.then(() => console.log('Connected to DB!'))
	.catch(error => console.log(error.message));
// import the seeding and seed the data base
// const seedDB = require("./seeds");
// seedDB();
// tell express to use body parser
app.use(bodyParser.urlencoded({extended: true}));
// make express process views as ejs files by default
app.set("view engine", "ejs");
// tell express to serve the public directory
app.use(express.static("./public"));

// ==========================
//     CAMPGROUNDS ROUTES
// ==========================
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
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

// NEW route - show the form to create new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

// CREATE route - create a new campground
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

// SHOW route - show more info about a specific campground
app.get("/campgrounds/:id", (req, res) => {
	// find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec((error, foundCampground) => {
		if(error) {
			console.log(error);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// ==========================
//     COMMENTS ROUTES
// ==========================
// NEW route - render the submit comment form for a specific campground
app.get("/campgrounds/:id/comments/new", (req, res) => {
	// find the campground by id
	Campground.findById(req.params.id, (error, foundCampground) => {
		if(error) {
			console.log(error);
		} else {
			res.render("comments/new", {campground: foundCampground});
		}
	});
});

// CREATE route - add a new comment to a specific campground
app.post("/campgrounds/:id/comments", (req, res) => {
	// find the campground by id
	Campground.findById(req.params.id, (error, foundCampground) => {
		if(error) {
			console.log(error);
		} else {
			// create and add the comment to the DB using the data from the form
			Comment.create(req.body.comment, (error, newComment) => {
				if (error) {
					console.log(error);
				} else {
					// add the new comment to the campground
					foundCampground.comments.push(newComment);
					foundCampground.save();
					res.redirect(`/campgrounds/${foundCampground._id}`);
				}
			});
		}
	});
});

// set a port for the server to start on
app.listen(3000, () => {
    console.log("Yelp Camp app started on port 3000");
});