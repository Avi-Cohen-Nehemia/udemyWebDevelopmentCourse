const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);