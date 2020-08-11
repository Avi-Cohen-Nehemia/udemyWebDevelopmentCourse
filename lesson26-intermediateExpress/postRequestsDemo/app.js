const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let friends = ["Tony", "Miranda", "Justin", "Pierre", "Lilly"];

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/friends", (req, res) => {
    res.render("friends", {friends: friends});
});

app.post("/addFriend", (req, res) => {
    let newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect("friends");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});