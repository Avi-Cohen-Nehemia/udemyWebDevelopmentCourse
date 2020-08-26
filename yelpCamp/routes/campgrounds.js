// require express and savee express.Router to a variable
const express = require("express");
const router = express.Router();

// require relevant models
const Campground = require("../models/campground");
const Comment = require('../models/comment');

// require the middleware index.js file
const middleware = require("../middleware");

// require node-geocode for google maps api
const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
const geocoder = NodeGeocoder(options);

// ==========================
//     CAMPGROUNDS ROUTES
// ==========================
// INDEX route - show all campgrounds
router.get("/", async (req, res) => {
	try {
		let allCampgrounds = await Campground.find();
		res.render("campgrounds/index", {campgrounds: allCampgrounds});
	} catch (error) {
		console.log(error);
	}
});

// NEW route - show the form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn,(req, res) => {
	// get the details of the user who is creating the campground
	let author = {
		id: req.user._id,
		username: req.user.username,
	};
	geocoder.geocode(req.body.campground.location, (err, data) => {
		if (err || !data.length) {
			req.flash('error', 'Invalid address');
			return res.redirect('back');
		}
		let lat = data[0].latitude;
		let lng = data[0].longitude;
		let location = data[0].formattedAddress;
		let newCampground = {
			...req.body.campground,
			author: author,
			location: location,
			lat: lat,
			lng: lng
		};
		// Create a new campground and save to DB
		Campground.create(newCampground, (err, newlyCreated) => {
			if(err){
				console.log(err);
			} else {
				//redirect back to campgrounds page
				console.log(newlyCreated);
				req.flash("success","Campground created successfuly!");
				res.redirect(`/campgrounds/${newlyCreated._id}`);
			}
	  	});
	});
});

// SHOW route - show more info about a specific campground
router.get("/:id", (req, res) => {
	// find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec((error, foundCampground) => {
		if(error || !foundCampground) {
			req.flash("error", "Campground not found")
			res.redirect("/campgrounds");
		} else {
			res.render("campgrounds/show", { campground: foundCampground });
		}
	});
});

// EDIT route - will render the edit page for a specific campground
// add middleware "isTheCampgroundOwner" to check if the user is logged in and the owner of that campground
router.get("/:id/edit", middleware.isTheCampgroundOwner, async (req, res) => {
	try {
		// find the campground with provided id and store in a variable
		let foundCampground = await Campground.findById(req.params.id);
		// pass the found campground's details to the edit view
		res.render("campgrounds/edit", { campground: foundCampground });
	} catch (error) {
		console.log(error);
		res.redirect("/campgrounds");
	}
});

// UPDATE route - will update the campground's details when submitting the edit form
router.put("/:id", middleware.isTheCampgroundOwner, (req, res) => {
	geocoder.geocode(req.body.campground.location, (error, data) => {
		if (error || !data.length) {
			req.flash('error', 'Invalid address');
			return res.redirect('back');
		}
		req.body.campground.lat = data[0].latitude;
		req.body.campground.lng = data[0].longitude;
		req.body.campground.location = data[0].formattedAddress;
  
	  	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (error, campground) => {
			if(error){
				req.flash("error", error.message);
				res.redirect("back");
			} else {
				req.flash("success","Campground updated successfuly!");
				res.redirect("/campgrounds/" + campground._id);
			}
	  	});
	});
});

// DESTROY route - will delete a specific campground and its associated comments
router.delete("/:id", middleware.isTheCampgroundOwner, async (req, res) => {
	try {
		// use mongoose's built in method of finding an item
		let removedCampground = await Campground.findById(req.params.id);
		// remove the campground's associated comments
		await Comment.deleteMany({_id: { $in: removedCampground.comments }})
		// remove the campground
		await removedCampground.remove();
		res.redirect("/campgrounds");
	} catch (error) {
		console.log(error);
		res.redirect("/campgrounds");
	}
});

// export the routes to use them in app.js
module.exports = router;