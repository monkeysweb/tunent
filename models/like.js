var mongoose = require('mongoose');

var likeSchema = new mongoose.Schema(
{
	artist_id : String,
	track_id : String
});

likeSchema.statics.addToLikeTable = function (data, callback) {
	
 		this.create(data,callback);
}

module.exports = mongoose.model('like',likeSchema,'like');