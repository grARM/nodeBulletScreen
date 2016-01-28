var express = require('express');
var u = require('underscore');

var bulletQueue = {
	bulletList: [],
	getBulletList: function(){
		return bulletQueue.bulletList;
	},
	addBulletList: function(arr){
		bulletQueue.bulletList.push(arr);
		bulletQueue.bulletList = u.sortBy(bulletQueue.bulletList, 'date');
		console.log(bulletQueue.bulletList);
	},
	getAfterDate: function(date){
		var newArr = [];
		u.each(bulletQueue.bulletList, function (v, i){
			if(v.date > date){
				newArr.push(v);
			}
		});
		newArr = u.sortBy(newArr, 'date');
		return newArr;
	}
};

var bulletRet = {
	"getAll": bulletQueue.getBulletList,
	"getNew": bulletQueue.getAfterDate,
	"add": bulletQueue.addBulletList
};

module.exports = bulletRet;


