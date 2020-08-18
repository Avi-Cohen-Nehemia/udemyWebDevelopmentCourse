const mongoose = require("mongoose");

// schema setup
let campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],
});

// define and export new object using the schema created above
module.exports =  mongoose.model("Campground", campgroundSchema);