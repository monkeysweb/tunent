var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Artist = require('../models/artist');
var Counter_artist = require('../models/CounterArtist');

var mv = require('mv');
var multer = require('multer');
var upload = multer({ dest: './public/artistImages/' });
// Get all Artists in the Database

router.get('/getAllArtists', function(req, res, next) {
	Artist.getArtists("",function(err,data)
	{
		if (err) {
			var msg = "Artist.getArtists err block "+err;
			res.json({"status":false , "msg":msg});
		}
		if (data) {
			res.json({"status":true ,"msg":"All users","data":data});
		}
	})
});

// register new artist or user

router.post('/registerArtist' ,function(req, res, next) {
console.log(req.file);     console.log(req.files);   var artistObj = req.body;
if (!artistObj.email || !artistObj.first_name || !artistObj.last_name 
				|| !artistObj.usertype) { 

			res.json({"status":false , "msg": "Some parameter missing"});
}else{

	Artist.alreadyexistEmail(req.body.email,function(err,data)
	{

		if (err) {
			var msg = "Artist.alreadyexistEmail err block "+err;
			res.json({"status":false , "msg":msg});
		}
		if (data) {
			if (data.email == req.body.email) {
				res.json({"status":true ,"msg":"Email already exist"});
			}
		}else{
				// get new artist id
				Counter_artist.getArtistId(function(err,counter)
				{
					if (err) {
						var msg = "Counter_artist err block "+err;
						res.json({"status":false , "msg":msg});
					}
					if (counter) {
						req.body.artist_id = counter.value.sequence_value;
					// here we will save the image file and then add the user
					if (req.files.length>0) {

						mv(req.files.profile_image[0].path, "./public/artistImages/"+req.body.artist_id+".png", function(err) {
            		   if (err) { 
               				var msg = "mv err block "+err;
							res.json({"status":false , "msg":msg});
               				}
              		 });

            		req.body.profile_image = "/artistImages/"+req.body.artist_id+".png";
					}
					 


					Artist.addArtist(req.body,function(err,data)
						{
							if (err) {
								var msg = "Artist.addArtist err block "+err;
								res.json({"status":false , "msg":msg});
							}
							if (data) {
								res.json({"status":true , "msg":"Registration Successfull","data":data});
								}
					});

					}
				});

			
			
		}
	});
}



	
});


// Delete artist or user

router.post('/deleteArtist',function(req,res,next)
{

if (!req.body.email) {
res.json({"status":false , "msg":"email is missing in parameter"});

}else{
Artist.deleteArtist(req.body,function(err)
	{
		if (err) {
			var msg = "Artist.deleteArtist err block "+err;
			res.json({"status":false , "msg":msg});
		}else
		{
			res.json({"status":true , "msg":"Deleted Successfull"});
		}

	});
}

	
});


// Update artist or user

router.post('/updateArtist',function(req,res,next)
{
	if (!req.body.email) {
res.json({"status":false , "msg":"email is missing in parameter"});

}else{
	Artist.updateArtist(req.body,function(err,data)
	{
		if (err) {
			var msg = "Artist.updateArtist err block "+err;
			res.json({"status":false , "msg":msg});
		}else
		{
			// update the requiredField here
			data.first_name = req.body.first_name;
			data.last_name  = req.body.last_name;

			data.save();

			res.json({"status":true , "msg":"Updated Successfull","data":data});
		}

	})
}
});

// get artist detail
router.post('/artistDetail',function(req,res,next)
{

	if (!req.body.email) {
res.json({"status":false , "msg":"email is missing in parameter"});

}else{
		Artist.getArtists(req.body.email,function(err,data){
			if (err) {
				var msg = "Artist.updateArtist err block "+err;
				res.json({"status":false , "msg":msg});
			}
			if (data) {
				res.json({"status":true, "msg":"artist found", "data":data});
			}else{
				res.json({"status":false, "msg":"artist not found"});
			}
		});
	}
});

module.exports = router;