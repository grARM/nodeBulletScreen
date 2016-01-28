var express = require('express');
var bulletQueue = require('../model/bulletQueue');
var router = express.Router();
var urllib = require('url');
var u = require('underscore');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource ajaxs');
});

router.post('/addBullet', function (req, res, next){
	var bullet = req.body;
	bullet.date = (new Date()).getTime();
	bulletQueue.add(bullet);
	res.json({"errorCode": 0,"errorMessage": 'addBullet is OK'});
});

/* get long link*/
 
router.get('/longLink', function (req, res, next){
	var params = urllib.parse(req.url, true);
	var reqData = {"errorCode": 0,"errorMessage": 'longLink is OK', "data": []};

	if(params.query && params.query.lastDate){
		reqData.data = bulletQueue.getNew(params.query.lastDate);

	}else{
		reqData.data = bulletQueue.getAll();
	}

	if(reqData.data.length > 0){
		reqData.lastDate = (u.last(reqData.data)).date;
	}else{
		reqData = {"errorCode": 1,"errorMessage": 'no data', "data": []};
	}
	

	//console.log(params);
	if(params.query && params.query.callback){
		var str =  params.query.callback + '(' + JSON.stringify(reqData) + ')';//jsonp  
    	res.end(str);
	}else{
		res.end(JSON.stringify(reqData));
	}



	//res.json({errorCode: 0,errorMessage: 'longLink is OK'});
});


module.exports = router;