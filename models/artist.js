var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema(
{
	artist_id : String,
	email : String,
	first_name : String,
	last_name : String,
	genre : String,
	bio : String,
	fbPageUrl : String,
	soundcloudUrl : String,
	twitterhandle: String,
	websiteUrl : String,
	profile_image : String,
	location : String,
	usertype : String
});

artistSchema.statics.getArtists = function (artistemail, callback) {
	if (artistemail=="") {
 		return this.find(callback);
	}else{
		 return this.findOne({ email: artistemail }, callback);
	}
 
}
artistSchema.statics.addArtist = function (artist, callback) {
	
	this.create(artist,callback);
 
}
artistSchema.statics.alreadyexistEmail = function (artistemail, callback) {
	
	

	this.findOne({email:artistemail},callback);
 
}
artistSchema.statics.deleteArtist = function (artist, callback) {
	
	this.findOneAndRemove({email:artist.email}, callback);

	
 
}

artistSchema.statics.updateArtist = function (artist, callback) {
	
	this.findOne({email:artist.email}, callback);

	
 
}
artistSchema.statics.alreadyexistArtistId = function (artistId, callback) {
	
	

	this.findOne({artist_id:artistId},callback);
 
}
module.exports = mongoose.model('artist',artistSchema,'artist');
