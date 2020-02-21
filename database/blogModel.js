const mongoose, { Schema } = require('mongoose');

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number
    }
});

const BlogModel = mongoose.model('blog', BlogSchema);

module.exports = BlogModel;