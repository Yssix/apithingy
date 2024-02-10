const mongoose = require ( 'mongoose' )

const reviewSchema = new mongoose.Schema({
    rating: String,
    game_name: String,
    comment: String,
    author: String
},
{
    collection: 'review_collection'
})

module.exports = mongoose.model('reviewModel', reviewSchema);