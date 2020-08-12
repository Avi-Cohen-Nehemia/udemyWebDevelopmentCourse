const express = require("express");
const app = express();
const axios = require('axios');
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
});

app.get("/results", (req, res) => {
    // saving the form input into a variable
    let searchedTerm = req.query.search;
    axios.get(`http://www.omdbapi.com/?s=${searchedTerm}&apikey=thewdb`)
    .then((data) => {
        let response = data.data.Search;
        res.render("results", {response: response});
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});