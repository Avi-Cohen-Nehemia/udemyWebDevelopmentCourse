// =========================
//          SETUP
// =========================
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/restful_blog')
	.then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now,
    }
});
const Blog = mongoose.model("Blog", blogSchema);

// =========================
//          ROUTES
// =========================
// HOME route
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
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// CREATE route
app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, (error, newBlog) => {
        if (error) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW route
app.get("/blogs/:id", (req, res) => {
	Blog.findById(req.params.id, (error, foundBlog) => {
		if(error) {
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

// EDIT route
app.get("/blogs/:id/edit", (req, res) => {
	Blog.findById(req.params.id, (error, foundBlog) => {
		if(error) {
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

// UPDATE route
app.put("/blogs/:id", (req, res) => {
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (error, updatedBlog) => {
		if(error) {
			res.redirect("/blogs");
		} else {
			res.redirect(`/blogs/${req.params.id}`);
		}
	});
});

// DESTROY route
app.delete("/blogs/:id", (req, res) => {
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (error, updatedBlog) => {
		if(error) {
			console.log(error);
		} else {
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, () => {
    console.log("Restful Blog app started on port 3000");
});