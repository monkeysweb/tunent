var mongoose = require('mongoose');

var trackSchema = new mongoose.Schema(
{
	track_id: String,
	cover_art : String,
	track_name : String,
	uploadedBy : String,
	stream_url : String,
	uploadedDate : String,
	likes : String,
	dislikes : String,
	skip : String,
	Shares : String
});

trackSchema.statics.getTracks = function (trackid, callback) {
	if (trackid=="") {
 		return this.find(callback);
	}else{
		 return this.find({ track_id: trackid }, callback);
	}
 
}
trackSchema.statics.addTrack = function (track, callback) {

	this.create(track,callback);
 
}

trackSchema.statics.deleteTrack = function (track, callback) {

	this.findOneAndRemove({track_id:track.track_id}, callback);
 
}

trackSchema.statics.updateTrack = function (track, callback) {

	this.findOne({track_id:track.track_id}, callback);
 
}

trackSchema.statics.trackDetail = function (trackId, callback)
{
	this.findOne({track_id:trackId}, callback);
}

module.exports = mongoose.model('track',trackSchema,'track');