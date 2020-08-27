// All the middleware goes in here

// import relevant models
const Campground = require("../models/campground");
const Review = require("../models/review");

// define a middleware object and add methods to it
const middlewareObj = {};

// if a user is logged in before allowing them to make some actions
middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
		return next();
    }
    req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

// a middleware to check if the user is logged in and own the campground they are trying to edit/delete
middlewareObj.isTheCampgroundOwner = (req, res, next) => {
	// check that the use is logged in
	if (req.isAuthenticated()) {
		// find the campground with provided id and store in a variable
		Campground.findById(req.params.id, (error, foundCampground) => {
			// check that the campground exists
			if (error || !foundCampground) {
				req.flash("error", "Campground not found");
				res.redirect("/campgrounds");
			} else {
				// check if the user who is trying to edit the campground also owns it
				// using the mongoose method ".equals"
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You are not the owner of this campground");
					res.redirect(`/campgrounds/${req.params.id}`);
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect(`/login`);
	}
}

// a middleware to check if the user is logged in and own the review they are trying to edit/delete
middlewareObj.isTheReviewOwner = (req, res, next) => {
	// check that the use is logged in
	if (req.isAuthenticated()) {
		// find the review with provided id and store in a variable
		Review.findById(req.params.review_id, (error, foundReview) => {
			// check that the review exists
			if (error || !foundReview) {
				req.flash("error", "Review not found");
				res.redirect(`/campgrounds/${req.params.id}`);
			} else {
				// check if the user who is trying to edit the review also owns it
				// using the mongoose method ".equals"
				if (foundReview.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You are not the owner of this review");
					res.redirect(`/campgrounds/${req.params.id}`);
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect(`/login`);
	}
}

// export the middleware file
module.exports = middlewareObj;