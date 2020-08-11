const express = require("express");
const app = express();

// tell express to use this directory
app.use(express.static("public"));

// tell express to assume files are in ejs format
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

// pass a variable to a ejs/template file in the "views" directory
app.get("/fall-in-love-with/:something", (req, res) => {
    let something = req.params.something;
    res.render("love", {something: something});
});

app.get("/posts", (req, res) => {
    let posts = [
        {title: "post 1", author: "Susy"},
        {title: "My Adorable Pet", author: "Charlie"},
        {title: "Can you believe this pomsky?", author: "Colt"},
    ];
    res.render("posts", {posts: posts});
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});