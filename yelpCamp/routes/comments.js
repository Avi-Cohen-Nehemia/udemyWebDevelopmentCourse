// require express and savee express.Router to a variable
const express = require("express");
const router = express.Router({ mergeParams: true });

// import relevant models
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const comment = require("../models/comment");

// pass this middleware function to anywhere you would like to check
// if a user is logged in before allowing them to make some actions
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

// ==========================
//     COMMENTS ROUTES
// ==========================
// NEW route - render the submit comment form for a specific campground
router.get("/new", isLoggedIn, (req, res) => {
	// find the campground by id
	Campground.findById(req.params.id, (error, foundCampground) => {
		if(error) {
			console.log(error);
		} else {
			res.render("comments/new", { campground: foundCampground });
		}
	});
});

// CREATE route - add a new comment to a specific campground
router.post("/", isLoggedIn, (req, res) => {
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
                    // take the current user's details and save them to the comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
					// add the new comment to the campground
					foundCampground.comments.push(newComment);
					foundCampground.save();
					res.redirect(`/campgrounds/${foundCampground._id}`);
				}
			});
		}
	});
});

router.get("/:comment_id/edit", async (req, res) => {
	let foundCampground = await Campground.findById(req.params.id);
	let foundComment = await Comment.findById(req.params.comment_id);
	try {
		res.render("comments/edit", { campground: foundCampground, comment: foundComment });
	} catch (error) {
		res.redirect("back");
	}
});

// export the routes to use them in app.js
module.exports = router;