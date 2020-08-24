// All the middleware goes in here

// import relevant models
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// define a middleware object and add methods to it
const middlewareObj = {};

// if a user is logged in before allowing them to make some actions
middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

// a middleware to check if the user is logged in and own the campground they are trying to edit/delete
middlewareObj.isTheCampgroundOwner = async (req, res, next) => {
    // find the campground with provided id and store in a variable
	let foundCampground = await Campground.findById(req.params.id);
	// check if the user is logged in
	if (req.isAuthenticated()) {
		// check if the user who is trying to edit the campground also owns it
		// using the mongoose method ".equals"
		if (foundCampground.author.id.equals(req.user._id)) {
			next();
		} else {
			res.redirect("back");
		}
	} else {
		res.redirect("back");
	}
}

// a middleware to check if the user is logged in and own the comment they are trying to edit/delete
middlewareObj.isTheCommentOwner = async (req, res, next) => {
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

// export the middleware file
module.exports = middlewareObj;