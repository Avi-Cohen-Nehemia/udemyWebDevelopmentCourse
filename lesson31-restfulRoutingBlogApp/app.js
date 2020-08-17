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
app.use(express.static("public"));

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now,
    }
});

// ROUTES
app.get("/", (req, res) => {
	res.redirect("/blogs");
});
// INDEX route
app.get("/blogs", (req, res) => {
    Blog.find({}, (error, blogs) =>{
        if (error) {
            console.log("error!")
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});
// NEW route
app.get("blogs/new", (req, res) => {
    res.render("new");
});

const Blog = mongoose.model("Blog", blogSchema);

app.listen(3000, () => {
    console.log("Restful Blog app started on port 3000");
});