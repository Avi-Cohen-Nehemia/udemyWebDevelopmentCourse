const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/blog_demo')
	.then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

// USER Schema
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
});
const User = mongoose.model("User", userSchema);

// POST Schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});
const Post = mongoose.model("Post", postSchema);