var mongoose = require('mongoose');

var likeSchema = new mongoose.Schema(
{
	artist_id : String,
	track_id : String
});

likeSchema.statics.addToLikeTable = function (data, callback) {
	
 		this.create(data,callback);
}

likeSchema.statics.checkForDuplicateEntry= function (data, callback) {
	
 		this.findOne({artist_id:data.artist_id,track_id:data.track_id},callback);
}



module.exports = mongoose.model('like',likeSchema,'like');