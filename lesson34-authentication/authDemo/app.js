const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const expressSession = require("express-session");
const User = require("./models/user");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/auth_demo')
	.then(() => console.log('Connected to DB!'))
	.catch(error => console.log(error.message));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
    secret: "sushi",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    res.render("secret");
});

// AUTH Routes
// show register form
app.get("/register", (req, res) => {
    res.render("register");
});
// sign up
app.post("/register", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.register(new User({username: username}), password, (error, newUser) => {
        if (error) {
            console.log(error);
            return res.render("regiser");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secret");
            });
        }
    });
});

// LOGIN routes
//show login form
app.get("/login", (req, res) => {
    res.render("login");
});

app.listen(3000, () => {
    console.log("Auth Demo app started on port 3000");
});