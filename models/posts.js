const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imagesURL: [{
        type: String
    }],
    tags: [{
        type: Schema.ObjectId,
        ref: 'tags'
    }]
});

module.exports = mongoose.model("posts", postSchema);