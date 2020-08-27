// require express and savee express.Router to a variable
const express = require("express");
const router = express.Router({ mergeParams: true });

// import relevant models
const Campground = require("../models/campground");
const Review = require("../models/review");

// require the middleware index.js file
const middleware = require("../middleware");

// ==========================
//     REVIEWS ROUTES
// ==========================
// NEW route - render the submit review form for a specific campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
	// find the campground by id
	Campground.findById(req.params.id, (error, foundCampground) => {
		if(error) {
			console.log(error);
		} else {
			res.render("reviews/new", { campground: foundCampground });
		}
	});
});

// CREATE route - add a new review to a specific campground
router.post("/", middleware.isLoggedIn, (req, res) => {
	// find the campground by id
	Campground.findById(req.params.id, (error, foundCampground) => {
		if(error) {
			req.flash("error", "Something went wrong");
		} else {
			// create and add the review to the DB using the data from the form
			Review.create(req.body.review, (error, newReview) => {
				if (error) {
					console.log(error);
				} else {
                    // take the current user's details and save them to the review
                    newReview.author.id = req.user._id;
                    newReview.author.username = req.user.username;
                    newReview.save();
					// add the new review to the campground
					foundCampground.reviews.push(newReview);
					foundCampground.save();
					req.flash("success", "Review added successfuly");
					return res.redirect(`/campgrounds/${foundCampground._id}`);
				}
			});
		}
	});
});

// EDIT route - will render the edit page for a specific review
router.get("/:review_id/edit", middleware.isTheReviewOwner, (req, res) => {
	Campground.findById(req.params.id, (error, foundCampground) => {
		if (error || !foundCampground) {
			req.flash("error", "Campground not found");
			return res.redirect("/campgrounds");
		}
		Review.findById(req.params.review_id, (error, foundReview) => {
			if (error || !foundReview) {
				req.flash("error", "Review not found");
				return res.redirect("/campgrounds");
			} else {
				res.render("reviews/edit", { campground: foundCampground, review: foundReview });
			}
		});
	});
});

// UPDATE route - will update the review's details when submitting the edit form
router.put("/:review_id", middleware.isTheReviewOwner, async (req, res) => {
	try {
		// use mongoose's built in method to find an item and update its details
		await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
		// add alert as feedback for the user
		req.flash("success", "Review edited successfuly");
		res.redirect(`/campgrounds/${req.params.id}`);
	} catch (error) {
		console.log(error);
		res.redirect("back");
	}
});

// DESTROY route - will delete a specific review
router.delete("/:review_id", middleware.isTheReviewOwner, async (req, res) => {
	try {
		// use mongoose's built in method of finding an item
		let removedReview = await Review.findById(req.params.review_id);
		// remove the review
		await removedReview.remove();
		// add alert as feedback for the user
		req.flash("success", "Review deleted successfuly");
		// remove back to the show page
		res.redirect(`/campgrounds/${req.params.id}`);
	} catch (error) {
		console.log(error);
		res.redirect("back");
	}
});

// export the routes to use them in app.js
module.exports = router;