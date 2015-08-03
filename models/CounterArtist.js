var mongoose = require('mongoose');

var counterArtistSchema = new mongoose.Schema(
{
	_id: String,
	sequence_value: Number,
});

counterArtistSchema.statics.getArtistId = function (callback) {
	this.collection.findAndModify({ _id: 'artistId' }, [], { $inc: { sequence_value: 1 } }, {}, callback);
 
}
module.exports = mongoose.model('Counter_artist',counterArtistSchema,'Counter_artist');