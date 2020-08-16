// import mongoose
const mongoose = require("mongoose");

// add a new campground to the data base
const CampgroundSchema = mongoose.Schema({
    name: String,
    image: String,
});

// retrieve all campgrounds from the database

// export the model
module.export = mongoose.model("Campgrounds", CampgroundSchema);