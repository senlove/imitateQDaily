

// 一个范围的随机数
function rnd(n, m){
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
}


$(function () {

	var mySwiper = new Swiper ('.swiper-container', {
		direction:'horizontal',
		autoplay:2000,
		loop:true,
		prevButton:'.swiper-button-prev',
		nextButton:'.swiper-button-next'
	});


	$(".head_center_all_category").click(function(event) {

		//三角形发生旋转
		var $triangleImg = $(this).find("img");

		$(".head_category_list_container").toggle();
		return false;
	});

	var arrayLength = 6;
	var descArrays = [
						"两大浏览器将停止自动播放视频，这对广告行业有什么影响？",
						"这套可移动的模块化单元房，可作图书馆也可作住宅",
						"日本小镇特产走出大山，靠的是一座废料搭起来的酿酒厂",
						"沃尔玛引入扫描货架机器人，速度比人类快三倍",
						"美图投资的 Faceu 完成新一轮融资，也说要做社交",
						"「这世界」130 年了，千克的定义要变了"
					 ];

	var imgArrays = ["http://img.qdaily.com/article/article_show/20171031094030LZbuDQdlaX4SFohi.png?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1",
					"http://img.qdaily.com/article/article_show/201710311110263FMjdvzcn7QraOu2.jpg?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1",	
					"http://img.qdaily.com/article/article_show/20171031114624dis7rOEJR62YjgDw.jpg?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1",	
					"http://img.qdaily.com/article/article_show/20171031115703gIHeuaTCJ5kBFqoh.png?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1",	
					"http://img.qdaily.com/article/article_show/201710301359295QmfD8yiJvbNl6Ea.jpg?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1",	
					"http://img.qdaily.com/article/article_show/20171030225326muNfc0HEQsnJeDb6.jpg?imageMogr2/auto-orient/thumbnail/!245x185r/gravity/Center/crop/245x185/quality/85/format/webp/ignore-error/1"];
	


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


	var arrs = new Array();
	for(var i=0; i<20; i++){

		var itemData = new ItemData();
		itemData.imgSrc = imgArrays[rnd(0,6)];
		itemData.desc = descArrays[rnd(0,6)];
		itemData.publishTime = 1509441932132;//毫秒做单位
		itemData.commentCount = 10;
		itemData.praiseCount = 15;	

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


	var $itemContainer = $('.item-container');
	var $ulTag = $('<ul></ul>');
	$itemContainer.append($ulTag);
	var htmlTemp = '';
	htmlTemp += '<ul>';

	// var ulTag = '<ul></ul>';
	var noMarginRightTag =0;

	var lineCount = 0;	
	for(var i=0; i<arrs.length; i++){
		var itemData = arrs[i];


		var container = "";
		switch(itemData.type){
			case 100:
			lineCount ++;
			container = createItem(itemData, 100, lineCount);
			break;
			case 200:
			lineCount = lineCount + 2;
			container = createItem(itemData, 200, lineCount);
			break;
			case 300:
			break;
		}
		var liTag = '<li>'+container+'</li>';
		htmlTemp += liTag;

		if(4 === lineCount){
			lineCount = 0;
		} 

	}
	htmlTemp += '</ul>';
	// jquery
	$itemContainer.html(htmlTemp);
});

function createItem(itemData, type, lineCount){
	var commentStr = '<span>'+itemData.commentCount+'</span>';
	var praiseStr = '<span>'+itemData.praiseCount+'</span>';
	//这里的class还是强依赖了，修改了css文件，这里也得跟着修改
	var divCommentPraise = '<div class="item-normal-praise">' + commentStr +　praiseStr+'</div>';
	var timeStr = '<span>刚刚</span>';
	var divTimeCommentPraise = '<div class="item-time-comment-praise">'+ timeStr + divCommentPraise+'</div>';

	var descStr = '<span>'+itemData.desc+'</span>';
	var divTxt = '<div class="item-normal-txt">'+descStr+divTimeCommentPraise+'</div>';

	var img = '<img src="'+itemData.imgSrc+'">';

	var categoryStr = '<span>商业</span>';

	var divCategory = divCategory = '<div class="item-normal-category">'+categoryStr+'</div>';

	var aTag = '<a href="">'+divCategory+img+divTxt+'</a>';

	if(200 === type){

		if(4 === lineCount){
			return '<div class="item-large">'+aTag+'</div>';					
		}
		return '<div class="item-large item-margin-right">'+aTag+'</div>';
	} else{

		if(4 === lineCount) {
			return '<div class="item-normal">'+aTag+'</div>';
		}
		return '<div class="item-normal item-margin-right">'+aTag+'</div>';
	}
	

}


