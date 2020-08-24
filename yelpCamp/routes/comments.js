// require express and savee express.Router to a variable
const express = require("express");
const router = express.Router({ mergeParams: true });

// import relevant models
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// require the middleware index.js file
const middleware = require("../middleware");

// ==========================
//     COMMENTS ROUTES
// ==========================
// NEW route - render the submit comment form for a specific campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
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
router.post("/", middleware.isLoggedIn, (req, res) => {
	// find the campground by id
	Campground.findById(req.params.id, (error, foundCampground) => {
		if(error) {
			req.flash("error", "Something went wrong");
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
					req.flash("success", "Comment added successfuly");
					res.redirect(`/campgrounds/${foundCampground._id}`);
				}
			});
		}
	});
});

// EDIT route - will render the edit page for a specific comment
router.get("/:comment_id/edit", middleware.isTheCommentOwner, (req, res) => {
	Campground.findById(req.params.id, (error, foundCampground) => {
		if (error || !foundCampground) {
			req.flash("error", "Campground not found");
			return res.redirect("/campgrounds");
		}
		Comment.findById(req.params.comment_id, (error, foundComment) => {
			if (error || !foundComment) {
				req.flash("error", "Comment not found");
				return res.redirect("/campgrounds");
			} else {
				res.render("comments/edit", { campground: foundCampground, comment: foundComment });
			}
		});
	});
});

// UPDATE route - will update the comment's details when submitting the edit form
router.put("/:comment_id", middleware.isTheCommentOwner, async (req, res) => {
	try {
		// use mongoose's built in method to find an item and update its details
		await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
		// add alert as feedback for the user
		req.flash("success", "Comment edited successfuly");
		res.redirect(`/campgrounds/${req.params.id}`);
	} catch (error) {
		console.log(error);
		res.redirect("back");
	}
});

// DESTROY route - will delete a specific comment
router.delete("/:comment_id", middleware.isTheCommentOwner, async (req, res) => {
	try {
		// use mongoose's built in method of finding an item
		let removedComment = await Comment.findById(req.params.comment_id);
		// remove the comment
		await removedComment.remove();
		// add alert as feedback for the user
		req.flash("success", "Comment deleted successfuly");
		// remove back to the show page
		res.redirect(`/campgrounds/${req.params.id}`);
	} catch (error) {
		console.log(error);
		res.redirect("back");
	}
});

// export the routes to use them in app.js
module.exports = router;