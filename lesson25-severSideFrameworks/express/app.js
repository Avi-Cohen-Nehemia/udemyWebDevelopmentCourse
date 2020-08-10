const express = require("express");
const app = express();

// when visiting "/" => "Hi there!"
app.get("/", (req, res) => {
    res.send("Hi there!");
});

// when visiting "/bye" => "Goodbye!"
app.get("/bye", (req, res) => {
    res.send("Goodbye!");
});

// when visiting "/dog" => "MEOW!"
app.get("/dog", (req, res) => {
    res.send("MEWO!");
});

// when user tryes to access a non existing page we can use * to show them a 404 page
// you should define this route at the end of your routes so it won't override the others
app.get("*", (req, res) => {
    res.send("404");
});

// Tell express to listen for requests (start server)
app.listen(3000, () => {
    console.log("Server started on port 3000");
});