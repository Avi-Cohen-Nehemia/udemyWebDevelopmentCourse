// require express and savee express.Router to a variable
const express = require("express");
const router = express.Router();

// import relevant models
const Campground = require("../models/campground");
const Comment = require('../models/comment');

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
router.post("/", isLoggedIn, (req, res) => {
    // get the data from the form
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    // get the details of the user who is creating the campground
    let author = {
        id: req.user._id,
        username: req.user.username,
    };
    // store all the details in a variable
    let newCampground = {
        name: name,
        image: image,
        description: description,
        author: author,
    };
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
			res.render("campgrounds/show", { campground: foundCampground });
		}
	});
});

// EDIT route - will render the edit page for a specific campground
router.get("/:id/edit", (req, res) => {
	// find the campground with provided id
	Campground.findById(req.params.id, (error, foundCampground) => {
		if (error) {
			res.redirect("/campgrounds")
		} else {
			// pass the found campground's details to the edit view
			res.render("campgrounds/edit", { campground: foundCampground });
		}
	});	
});

// UPDATE route - will update the campground's details when submitting the edit form
router.put("/:id", (req, res) => {
	// use mongoose's built in method of finding by id AND updating the found item
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (error, updatedCampground) => {
		if (error) {
			res.redirect("/campgrounds")
		} else {
			// pass the found campground's details to the edit view
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
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