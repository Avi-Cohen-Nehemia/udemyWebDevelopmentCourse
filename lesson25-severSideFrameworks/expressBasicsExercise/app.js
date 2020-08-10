const express = require("express");
const app = express();

// when visiting "/" print a welcome message
app.get("/", (req, res) => {
    res.send("Hi there, welcome to my assignment!");
});

// customize animals and the sounds they make
app.get("/speak/:animal", (req, res) => {
    let sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "Meow",
        bird: "tweet"
    }

    // storing the animal parameter and making sure it is lower case
    let animal = req.params.animal.toLowerCase();

    res.send(`The ${animal} says ${sounds[animal]}`);
});

// repeat a message a number of times
app.get("/repeat/:message/:numberOfTimes", (req, res) => {
    let numberOfTimes = req.params.numberOfTimes;
    let message = req.params.message + " ";

    let generateMessage = () => {
        let string = "";
        for (let i = 0; i < numberOfTimes; i += 1) {
            string += message
        }
        return string
    }

    res.send(generateMessage());
});

// 404
app.get("*", (req, res) => {
    res.send("Sorry, page not found... What are you doing with your life?");
});

// Tell express to listen for requests (start server)
app.listen(3000, () => {
    console.log("Server started on port 3000");
});