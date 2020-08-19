const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/auth_demo')
	.then(() => console.log('Connected to DB!'))
	.catch(error => console.log(error.message));

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", (req, res) => {
    res.render("secret");
});

app.listen(3000, () => {
    console.log("Auth Demo app started on port 3000");
});