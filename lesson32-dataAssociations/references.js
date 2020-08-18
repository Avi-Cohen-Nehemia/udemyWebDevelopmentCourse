const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/blog_demo_2')
	.then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

const Post = require("./models/post");
const User = require("./models/user");

// create a new post
Post.create({
	title: "Another amazing post",
	content: "asdf asdik afdg ;aoig a;idfggh",
}, (error, post) => {
	// find a specific user
	User.findOne({name: "Bob Belcher"}, (error, foundUser) => {
		if(error) {
			console.log(error);
		} else {
			// add and save the post to that user
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

// find a user and all of its posts
// User.findOne({name: "Bob Belcher"}).populate("posts").exec((error, foundUser) => {
// 	if(error) {
// 		console.log(error);
// 	} else {
// 		console.log(foundUser);
// 	}
// });

// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher",
// });