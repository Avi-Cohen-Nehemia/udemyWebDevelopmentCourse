const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/fall-in-love-with/:something", (req, res) => {
    let something = req.params.something;
    res.render("love.ejs", {somethingVar: something});
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});