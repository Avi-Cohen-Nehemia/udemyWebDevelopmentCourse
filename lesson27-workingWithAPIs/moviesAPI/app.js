const express = require("express");
const app = express();
const axios = require('axios');

// install and tell express to use "body-parser" to be able to access posted values
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("welcome to the movie app");
});

app.get("/results", (req, res) => {
    axios.get("http://www.omdbapi.com/?s=israel&apikey=thewdb")
    .then((data) => {
        console.log(data.data.Search[2].Title);
    });
});

app.post("/addFriend", (req, res) => {
    let newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect("friends");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

// "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"