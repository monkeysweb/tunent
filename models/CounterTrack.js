var mongoose = require('mongoose');

var counterTrackSchema = new mongoose.Schema(
{
	_id: String,
	sequence_value: Number,
});

counterTrackSchema.statics.getTrackId = function (callback) {
	this.collection.findAndModify({ _id: 'trackId' }, [], { $inc: { sequence_value: 1 } }, {}, callback);
 
}
module.exports = mongoose.model('Counter_track',counterTrackSchema,'Counter_track');