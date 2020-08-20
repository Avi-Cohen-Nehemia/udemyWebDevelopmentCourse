const mongoose = require("mongoose");

// schema setup
let userSchema = new mongoose.Schema({
	username: String,
	password: String,
});

// define and export new object using the schema created above
module.exports =  mongoose.model("User", userSchema);