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

// a middleware to check if the user is logged in and own the comment they are trying to edit/delete
const isTheCommentOwner = async (req, res, next) => {
	// find the comment with provided id and store in a variable
	let foundComment = await Comment.findById(req.params.comment_id);
	// check if the user is logged in
	if (req.isAuthenticated()) {
		// check if the user who is trying to edit the comment also owns it
		// using the mongoose method ".equals"
		if (foundComment.author.id.equals(req.user._id)) {
			next();
		} else {
			res.redirect("back");
		}
	} else {
		res.redirect("back");
	}
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

// EDIT route - will render the edit page for a specific comment
router.get("/:comment_id/edit", isTheCommentOwner, async (req, res) => {
	let foundCampground = await Campground.findById(req.params.id);
	let foundComment = await Comment.findById(req.params.comment_id);
	try {
		res.render("comments/edit", { campground: foundCampground, comment: foundComment });
	} catch (error) {
		res.redirect("back");
	}
});

// UPDATE route - will update the comment's details when submitting the edit form
router.put("/:comment_id", isTheCommentOwner, async (req, res) => {
	try {
		// use mongoose's built in method to find an item and update its details
		await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
		res.redirect(`/campgrounds/${req.params.id}`);
	} catch (error) {
		console.log(error);
		res.redirect("back");
	}
});

// DESTROY route - will delete a specific comment
router.delete("/:comment_id", isTheCommentOwner, async (req, res) => {
	try {
		// use mongoose's built in method of finding an item
		let removedComment = await Comment.findById(req.params.comment_id);
		// remove the comment
		await removedComment.remove();
		// remove back to the show page
		res.redirect(`/campgrounds/${req.params.id}`);
	} catch (error) {
		console.log(error);
		res.redirect("back");
	}
});

// export the routes to use them in app.js
module.exports = router;