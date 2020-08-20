// require express and savee express.Router to a variable
const express = require("express");
const router = express.Router();

// import relevant models
const Campground = require("../models/campground");

// ==========================
//     CAMPGROUNDS ROUTES
// ==========================
// INDEX route - show all campgrounds
router.get("/", (req, res) => {
	Campground.find({}, (error, campgrounds) => {
		if(error) {
			console.log(error);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

// NEW route - show the form to create new campground
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

// CREATE route - create a new campground
router.post("/", (req, res) => {
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
router.get("/:id", (req, res) => {
	// find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec((error, foundCampground) => {
		if(error) {
			console.log(error);
		} else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// export the routes to use them in app.js
module.exports = router;