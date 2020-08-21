// require express and savee express.Router to a variable
const express = require("express");
const router = express.Router();

// import relevant models
const Campground = require("../models/campground");
const Comment = require('../models/comment');
const campground = require("../models/campground");

// pass this middleware function to anywhere you would like to check
// if a user is logged in before allowing them to make some actions
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

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
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// CREATE route - create a new campground
router.post("/", isLoggedIn, async (req, res) => {
	try {
		// get the details of the user who is creating the campground
		let author = {
			id: req.user._id,
			username: req.user.username,
		};
		// store the data from the form and the author's details in a variable
		let newCampground = {
			...req.body.campground,
			author: author,
		};
		// Create a new campground using the data above and save it to the DB
		await Campground.create(newCampground);
		res.redirect("/campgrounds");
	} catch (error) {
		console.log(error);
	}
});

// SHOW route - show more info about a specific campground
router.get("/:id", (req, res) => {
	// find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec((error, foundCampground) => {
		if(error) {
			console.log(error);
		} else {
			res.render("campgrounds/show", { campground: foundCampground });
		}
	});
});

// EDIT route - will render the edit page for a specific campground
router.get("/:id/edit", async (req, res) => {
	// find the campground with provided id and store in a variable
	let foundCampground = await Campground.findById(req.params.id);

	// check if the user is logged in
	if (req.isAuthenticated()) {
		// check if the user who is trying to edit the campground also owns it
		// using the mongoose method ".equals"
		if (foundCampground.author.id.equals(req.user._id)) {
			try {
				// pass the found campground's details to the edit view
				res.render("campgrounds/edit", { campground: foundCampground });
			} catch (error) {
				console.log(error);
				res.redirect("/campgrounds");
			}
		} else {
			res.send("you do not own this campground!");
		}
	} else {
		res.redirect("/register");
	}
});

// UPDATE route - will update the campground's details when submitting the edit form
router.put("/:id", async (req, res) => {
	try {
		// use mongoose's built in method to find an item and update its details
		await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
		res.redirect(`/campgrounds/${req.params.id}`);
	} catch (error) {
		console.log(error);
		res.redirect("/campgrounds");
	}
});

// DESTROY route - will delete a specific campground and its associated comments
router.delete("/:id", async (req, res) => {
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