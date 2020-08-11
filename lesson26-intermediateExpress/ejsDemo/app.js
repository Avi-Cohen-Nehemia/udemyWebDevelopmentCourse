const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.render("home.ejs");
});

// pass a variable to a ejs/template file in the "views" directory
app.get("/fall-in-love-with/:something", (req, res) => {
    let something = req.params.something;
    res.render("love.ejs", {something: something});
});

app.get("/posts", (req, res) => {
    let posts = [
        {title: "post 1", author: "Susy"},
        {title: "My Adorable Pet", author: "Charlie"},
        {title: "Can you believe this pomsky?", author: "Colt"},
    ];
    res.render("posts.ejs", {posts: posts});
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});