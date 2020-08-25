const mongoose = require("mongoose");

// schema setup
const CampgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
    description: String,
    price: String,
    location: String,
    lat: Number,
    lng: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        username: String,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],
});

// define and export new object using the schema created above
module.exports =  mongoose.model("Campground", CampgroundSchema);