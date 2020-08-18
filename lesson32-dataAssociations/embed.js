const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/blog_demo')
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
	// insert the schema to create an association between users and posts
	// in order to that, we need to define postSchema before the user schema
	posts: [postSchema],
});
const User = mongoose.model("User", userSchema);

// let newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger",
// });

// newUser.posts.push({
// 	title: "How to brew polyjuice potion",
// 	content: "Just kidding. Go to postions class to learn it!"
// });

// newUser.save((error, user) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(user);
//     }
// });

// let newPost = new Post({
// 	title: "Reflections on apples",
// 	content: "They are delicious",
// });

// newPost.save((error, post) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(post);
//     }
// });

// find a user by name and create a new post under their name
User.findOne({name: "Hermione Granger"}, (error, user) => {
	if (error) {
		console.log(error);
	} else {
		user.posts.push({
			title: "3 things I really hate",
			content: "Voldemort. Voldemort. Voldemort.",
		});
		user.save((error, user) => {
			if(error) {
				console.log(error);
			} else {
				console.log(user);
			}
		});
	}
});
