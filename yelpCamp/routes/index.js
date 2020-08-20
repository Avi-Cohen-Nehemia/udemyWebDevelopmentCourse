// import packages and 
const express = require("express");
const passport = require("passport");

// save express.Router to a variable
const router = express.Router();

// import relevant models
const User = require("../models/user");

// home/landing page route
router.get("/", (req, res) => {
    res.render("home");
});

// pass this middleware function to anywhere you would like to check
// if a user is logged in before allowing them to make some actions
const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

// ==========================
//   AUTHENTICATION ROUTES
// ==========================
// SHOW route - render the register form
router.get("/register", (req, res) => {
	res.render("register");
});

// CREATE route - create a new user
router.post("/register", (req, res) => {
	// create a new user using the username from the form and save it to a variable
	const newUser = new User({username: req.body.username});
	// the register method will attach the password from the form to the new user. It also handle
	// all the logic of hashing the password and preveting it from being saved to the data base
	User.register(newUser, req.body.password, (error, user) => {
		if (error) {
			console.log(error);
			return res.render("register");
		}
		// once the user signed up they will be authenticated and redirected to the index page
		passport.authenticate("local")(req, res, () => {
			res.redirect("/campgrounds");
		});
	});
});

// ==========================
//     LOGIN/OUT ROUTES
// ==========================
// SHOW route - render the login form
router.get("/login", (req, res) => {
    res.render("login");
});

// route to handle login logic
// pass the authentication middleware and check if the details the user entered are correct
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
	}),(req, res) => {
	}
);

// logout logic route
router.get("/logout", (req, res) => {
	// execute logout method which was provided by the passport packages we installed
	req.logout();
	// redirect back to the home page after logging out
    res.redirect("/");
});

// export the routes to use them in app.js
module.exports = router;