var express = require('express');
var app = express();


function ItemData(){

}

ItemData.prototype = {

	imgSrc:"",
	desc:"",
	publishTime:0,
	commentCount:0,
	praiseCount:0,
	type:100 //100 200 300
}

// 一个范围的随机数 0，6 包括6
function rnd(n, m){
	var random = Math.floor(Math.random()*(m-n+1)+n);
	return random;
}

var descArrays = [
"两大浏览器将停止自动播放视频，这对广告行业有什么影响？",
"这套可移动的模块化单元房，可作图书馆也可作住宅",
"日本小镇特产走出大山，靠的是一座废料搭起来的酿酒厂",
"沃尔玛引入扫描货架机器人，速度比人类快三倍",
"美图投资的 Faceu 完成新一轮融资，也说要做社交",
"「这世界」130 年了，千克的定义要变了"
];

var loadmoreDescArrays = [
"loadmore两大浏览器将停止自动播放视频，这对广告行业有什么影响？",
"loadmore这套可移动的模块化单元房，可作图书馆也可作住宅",
"loadmore日本小镇特产走出大山，靠的是一座废料搭起来的酿酒厂",
"loadmore沃尔玛引入扫描货架机器人，速度比人类快三倍",
"loadmore美图投资的 Faceu 完成新一轮融资，也说要做社交",
"loadmore「这世界」130 年了，千克的定义要变了"
];

var imgArrays = [
"http://img.qdaily.com/article/article_show/20171031094030LZbuDQdlaX4SFohi.png?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1",
"http://img.qdaily.com/article/article_show/201710311110263FMjdvzcn7QraOu2.jpg?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1",	
"http://img.qdaily.com/article/article_show/20171031114624dis7rOEJR62YjgDw.jpg?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1",	
"http://img.qdaily.com/article/article_show/20171031115703gIHeuaTCJ5kBFqoh.png?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1",	
"http://img.qdaily.com/article/article_show/201710301359295QmfD8yiJvbNl6Ea.jpg?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1",	
"http://img.qdaily.com/article/article_show/20171030225326muNfc0HEQsnJeDb6.jpg?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1"];


function createData(descArrays, imgArrays, arrsSize) {

	var arrs = new Array();
	for(var i=0; i<arrsSize; i++){

		var itemData = new ItemData();

		var random = rnd(0,5);
		// console.log(random);
		var imgRandomSrc = imgArrays[random];
		var descRandom = descArrays[random];
		// console.log(imgRandomSrc);
		// console.log(descRandom);

		itemData.imgSrc = imgRandomSrc;
		itemData.desc = descRandom;
		itemData.publishTime = 1509441932132;//毫秒做单位
		itemData.commentCount = 10;
		itemData.praiseCount = 15;
		itemData.type = 100;//搞不清楚转换为json字符串的时候没有出现这个值，所以先默认赋值		

		if(i === 5) {
			itemData.type = 200;
		}

		if(7 === i){
			itemData.type = 200;
		}

		if(15 === i) {
			itemData.type = 200;
		}

		arrs.push(itemData);
	}

	return arrs;
}


app.get('/itemList', function(req, response){

	 console.log(req.url);

	var dataList = createData(descArrays, imgArrays, 20);
	var jsonTxt = JSON.stringify(dataList);

	response.writeHead(200, {
		'Content-Type':"text/html; charset=utf-8",
		// 'Access-Control-Allow-Origin':'http://localhost:8081'
		'Access-Control-Allow-Origin':'*'
	});
	// response.writeHead(200, {
	// 	'Content-Type':"text/html; charset=utf-8"
	// });
	response.write(jsonTxt);
	response.end();
});

app.listen(8081, 'localhost',function(){
	console.log('来了没');
});
