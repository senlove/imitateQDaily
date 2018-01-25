var express = require('express');
var app = express();


// 一个范围的随机数 0，6 包括6
function rnd(n, m){
	var random = Math.floor(Math.random()*(m-n+1)+n);
	return random;
}

var categoryArrs = ['商业','游戏','设计','城市','智能','娱乐'];

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


function LoopEntry(){

}

LoopEntry.prototype = {
	imgUrl:"",
	category:"",
	desc:""
};

function ItemData(){

}

ItemData.prototype = {

	imgSrc:"",
	desc:"",
	publishTime:0,
	commentCount:0,
	praiseCount:0,
	type:100 //100 200 300
};

// 首页的数据
//五个轮播图的数据、4个item数据、一个大item的数据 包括投票数据、一个诗意的数据

function createIndexData(){

	//五个轮播图数据
	var loopEntrylist = new Array();

	for(var i=0; i<5; i++){
		var loopEntry = new LoopEntry();
		loopEntry.imgUrl = imgArrays[rnd(0, 5)];
		loopEntry.category = categoryArrs[rnd(0, 5)];
		loopEntry.desc = descArrays[rnd(0, 5)];

		loopEntrylist.push(loopEntry);
	}

	//一个固定item的数据
	var fxiedEntry = {
		imgUrl:'http://img.qdaily.com/paper/paper_show/20180123112706BX2OEmPdpVLtT6a0.jpg?imageMogr2/auto-orient/thumbnail/!670x320r/gravity/Center/crop/670x320/quality/85/format/webp/ignore-error/1',
		title:'你觉得有益的争论应该满足哪些标准？',
		desc:'认真你就不会输',

		supportImgUrl:'http://img.qdaily.com/house_and_life2.png'
	};

	//四个item的数据
	var itemDataList = new Array();
	for(var i=0; i<4; i++){
		var itemData = new ItemData();

		var random = rnd(0,4);
		var imgRandomSrc = imgArrays[random];
		var descRandom = descArrays[random];

		itemData.imgSrc = imgRandomSrc;
		itemData.desc = descRandom;
		itemData.publishTime = 1509441932132;//毫秒做单位
		itemData.commentCount = 10;
		itemData.praiseCount = 15;
		itemData.type = 100;//搞不清楚转换为json字符串的时候没有出现这个值，所以先默认赋值

		itemDataList.push(itemData);
	}



	var indexDataObj = new Object();
	indexDataObj.loopEntrylist = loopEntrylist;
	indexDataObj.fxiedEntry = fxiedEntry;
	indexDataObj.itemDataList = itemDataList;

	var indexDataJson = JSON.stringify(indexDataObj);
	console.log(indexDataJson);
	return indexDataJson;
}


app.get('/indexData', function(req, response){
		response.writeHead(200, {
		'Content-Type':"text/html; charset=utf-8",
		'Access-Control-Allow-Origin':'*'
	});

	var jsonTxt = createIndexData();
	response.write(jsonTxt);
	response.end();
});



function createData(arrsSize, index) {

	console.log(index);

	var arrs = new Array();
	for(var i=0; i<arrsSize; i++){

		var itemData = new ItemData();

		var random = rnd(0,5);
		var imgRandomSrc = imgArrays[random];
		var descRandom = descArrays[random];

		if(undefined === index){
			itemData.desc = descRandom;
		} else {
			itemData.desc = '第'+index+'页'+descRandom;
		}

		

		itemData.imgSrc = imgRandomSrc;

		itemData.publishTime = 1509441932132;//毫秒做单位
		itemData.commentCount = 10;
		itemData.praiseCount = 15;
		itemData.type = 100;//搞不清楚转换为json字符串的时候没有出现这个值，所以先默认赋值		

		// if(i === 5) {
		// 	itemData.type = 200;
		// }

		// if(7 === i){
		// 	itemData.type = 200;
		// }

		// if(15 === i) {
		// 	itemData.type = 200;
		// }

		arrs.push(itemData);
	}

	return arrs;
}


app.get('/itemList', function(req, response){

	var index = req.query.index;

	var dataList = createData(10, index);
	var jsonTxt = JSON.stringify(dataList);

	response.writeHead(200, {
		'Content-Type':"text/html; charset=utf-8",
		'Access-Control-Allow-Origin':'*'
	});
	response.write(jsonTxt);
	response.end();
});

app.listen(8081, 'localhost',function(){
	console.log('来了没');
});
