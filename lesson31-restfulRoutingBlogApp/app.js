const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/restful_blog')
	.then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("Restful Blog app started on port 3000");
});