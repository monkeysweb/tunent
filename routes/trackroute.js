var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Track = require('../models/track');
var Artist = require('../models/artist');
var Counter_track = require('../models/CounterTrack');
var Like = require('../models/like');
var mv = require('mv');
//get all tracks

router.get('/getAllTracks',function(req,res,next)
{
	Track.getTracks("",function(err,data)
	{
		if (err) {
			var msg = "Track.getTracks err block "+err;
			res.json({"status":false , "msg":msg});
		}
		if (data) {
			res.json({"status":true ,"msg":"All tracks","data":data});
		}
	})
})

//Add new track

router.post('/addTrack',function(req,res,next)
{
	Artist.alreadyexistEmail(req.body.uploadedBy,function(err,data)
	{

		if (err) {
			var msg = "Artist.alreadyexistEmail err block "+err;
			res.json({"status":false , "msg":msg});
		}
		if (data) {
			if (data.email == req.body.uploadedBy) {
				Counter_track.getTrackId(function(err,counter)
				{
					if (err) {
						var msg = "Counter_track.getTrackId err block "+err;
						res.json({"status":false , "msg":msg});
					}
					if (counter) {
							req.body.track_id = counter.value.sequence_value;

							//this is for coverart of the track


								mv(req.files.cover_art[0].path, "./public/trackImages/"+req.body.track_id+".png", function(err) {
            		   				if (err) { 
               							var msg = "mv err block "+err;
										res.json({"status":false , "msg":msg});
               							}
              		 			});

            					req.body.cover_art = "/trackImages/"+req.body.track_id+".png"; 
            				//this is for  the track

            					mv(req.files.stream_url[0].path, "./public/tracks/"+req.body.track_id+".mp3", function(err) {
            		   				if (err) { 
               							var msg = "mv err block "+err;
										res.json({"status":false , "msg":msg});
               							}
              		 			});

            					req.body.stream_url = "/tracks/"+req.body.track_id+".mp3"; 
            					Track.addTrack(req.body,function(err,data)
									{
										if (err) {
										var msg = "Track.addTrack err block "+err;
										res.json({"status":false , "msg":msg});
										}
								if (data) {
									res.json({"status":true ,"msg":"Track added successfully","data":data});
								}
					});
							
					}
				});

			}
		}else{
			res.json({"status":true ,"msg":"You are not allowed"});
			}
	});
})

//update track

router.post('/updateTrack',function(req,res,next)
{
	Artist.alreadyexistEmail(req.body.uploadedBy,function(err,data)
	{

		if (err) {
			var msg = "Artist.alreadyexistEmail err block "+err;
			res.json({"status":false , "msg":msg});
		}
		if (data) {
			if (data.email == req.body.uploadedBy) {
				Track.updateTrack(req.body,function(err,data)
					{
						if (err) {
							var msg = "Track.updateTrack err block "+err;
							res.json({"status":false , "msg":msg});
								}
						if (data) {
							// update key values here and hen save the document
								data.track_name = req.body.track_name;

							data.save();
							res.json({"status":true ,"msg":"Track updated successfully","data":data});
							
							}
					});
			}
		}else{
			res.json({"status":true ,"msg":"You are not allowed"});
			}
	});
})

//update track

router.post('/deleteTrack',function(req,res,next)
{
	Track.deleteTrack(req.body,function(err,data)
	{
		if (err) {
			var msg = "Track.updateTrack err block "+err;
			res.json({"status":false , "msg":msg});
		}
		if (data) {
			res.json({"status":true ,"msg":"Track deleted successfully","data":data});
		}
	})
})


// Like track
router.post('/likeTrack',function(req,res,next)
{
	Artist.alreadyexistArtistId(req.body.artist_id,function(err,data)
	{

		if (err) {
			var msg = "Artist.alreadyexistArtistId in likeTrack err block "+err;
			res.json({"status":false , "msg":msg});
		}
		if (data) {
			if (data.artist_id == req.body.artist_id) {
				// user is valid 
				// now we will check whether this user already liked this track
				//if true nothing will happen and if false we will update the like count for the track and also add new entry 
				// in the like collection

				Like.checkForDuplicateEntry(req.body,function(err,data){

					if (err) {
						var msg = "Like.checkForDuplicateEntry in likeTrack err block "+err;
							res.json({"status":false , "msg":msg});
						}
					if (data) {
						//duplicate entry
						res.json({"status":false,"msg":"You have already liked this track"});
					}else
					{
					//	update the like count for the track and also add new entry 
					// in the like collection

						Track.updateTrack(req.body,function(err,data)
					{
						if (err) {
							var msg = "Track.updateTrack in likeTrack err block "+err;
							res.json({"status":false , "msg":msg});
								}
						if (data) {
							// update key values here and hen save the document
								var likeCount = parseInt(data.likes);
								likeCount+=1;
								data.likes = ""+likeCount;

							data.save();
								Like.addToLikeTable(req.body,function(err,data)
									{
										if (err) {
											var msg = "Like.addToLikeTable err block "+err;
											res.json({"status":false , "msg":msg});
											}
										if (data) {
												res.json({"status":true ,"msg":"Liked successfully","data":data});
											}
									});
							
								}
					});
					}

				});
	
			}
		}else{
			res.json({"status":true ,"msg":"You are not allowed"});
			}
	});
})

// disLike track
router.post('/dislikeTrack',function(req,res,next)
{
	Artist.alreadyexistArtistId(req.body.artist_id,function(err,data)
	{

		if (err) {
			var msg = "Artist.alreadyexistArtistId in dislikeTrack err block "+err;
			res.json({"status":false , "msg":msg});
		}
		if (data) {
			if (data.artist_id == req.body.artist_id) {
				Track.updateTrack(req.body,function(err,data)
					{
						if (err) {
							var msg = "Track.updateTrack in dislikeTrack err block "+err;
							res.json({"status":false , "msg":msg});
								}
						if (data) {
							// update key values here and hen save the document
								var dislikeCount = parseInt(data.dislikes);
								dislikeCount+=1;
								data.dislikes = ""+dislikeCount;

							data.save();

							res.json({"status":true ,"msg":"disLiked successfully","data":data});
								}
					});
			}
		}else{
			res.json({"status":true ,"msg":"You are not allowed"});
			}
	});
})


// disLike track
router.post('/skipTrack',function(req,res,next)
{
	Artist.alreadyexistArtistId(req.body.artist_id,function(err,data)
	{

		if (err) {
			var msg = "Artist.alreadyexistArtistId in skipTrack err block "+err;
			res.json({"status":false , "msg":msg});
		}
		if (data) {
			if (data.artist_id == req.body.artist_id) {
				Track.updateTrack(req.body,function(err,data)
					{
						if (err) {
							var msg = "Track.updateTrack in skipTrack err block "+err;
							res.json({"status":false , "msg":msg});
								}
						if (data) {
							// update key values here and hen save the document
								var skipCount = parseInt(data.skip);
								skipCount+=1;
								data.skip = ""+skipCount;

							data.save();

							res.json({"status":true ,"msg":"Skiped successfully","data":data});
								}
					});
			}
		}else{
			res.json({"status":true ,"msg":"You are not allowed"});
			}
	});
})



module.exports = router;