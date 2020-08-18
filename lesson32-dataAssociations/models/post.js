const mongoose = require("mongoose");

// POST Schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

module.exports = mongoose.model("Post", postSchema);