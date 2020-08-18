const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/blog_demo_2')
	.then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

// POST Schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});
const Post = mongoose.model("Post", postSchema);

// USER Schema
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
	// creating an association between users and posts by referencing data
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		}
	],
});
const User = mongoose.model("User", userSchema);

Post.create({
	title: "How to cook the best burger",
	content: "It's really easy!!",
}, (error, post) => {
	User.findOne({name: "Bob Belcher"}, (error, foundUser) => {
		if(error) {
			console.log(error);
		} else {
			foundUser.posts.push(post);
			foundUser.save((error, data) => {
				if(error) {
					console.log(error);
				} else {
					console.log(data);
				}
			});
		}
	});
});

// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher",
// });