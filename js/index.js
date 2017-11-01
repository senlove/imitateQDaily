

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
	

	var arrs = new Array();
	for(var i=0; i<6; i++){

		var itemData = new Object();
		itemData.imgSrc = imgArrays[i];
		itemData.desc = descArrays[i];
		itemData.publishTime = 1509441932132;//毫秒做单位
		itemData.commentCount = 10;
		itemData.praiseCount = 15;	

		arrs.push(itemData);
	}


	var $itemContainer = $('.item-container');


	for(var i=0; i<arrs.length; i++){

		var itemData = arrs[i];

		var $divTag = $('<div></div>');

		var $aTag = $('<a></a>');
		var $imgTag = $('<img></img>');

		var $divTagCategory = $('<div></div>');
		var $spanTagCategory = $('<span></span>');

		var $divTagTxtContainer = $('<div></div>');
		var $spanTagTxt = $('<span></span>');

		var $divTagTimePraiseContainer = $('<div></div>');
		var $spanTagTime = $('<span></span>');

		var $divTagPraise = $('<div></div>');
		var $spanTagComment = $('<span></span>');
		var $spanTagPraise = $('<span></span>');

		//这样弄很难维护耶，写也很恶心。。

		$divTag.attr('class', 'item-normal');
		$divTag.append($aTag);


		$spanTagCategory.text('商业');
		$divTagCategory.attr('class', 'item-normal-category');
		$divTagCategory.append('$spanTagCategory');
		$aTag.append($divTagCategory);

		$imgTag.attr('src', itemData.imgSrc);
		$aTag.append($imgTag);


		$spanTagTxt.text(itemData.desc);
		$divTagTxtContainer.attr('class', 'item-normal-txt');
		$divTagTxtContainer.append($spanTagTxt);

		$divTagTimePraiseContainer.attr('class', 'item-time-comment-praise');
		$spanTagTime.text('刚刚');
		$divTagTimePraiseContainer.append($spanTagTime);

		$divTagPraise.attr('class', 'item-normal-praise');
		$spanTagComment.text(itemData.commentCount);
		$spanTagPraise.text(itemData.praiseCount);
		$divTagPraise.append($spanTagComment);
		$divTagPraise.append($spanTagPraise);

		$divTagTimePraiseContainer.append($divTagPraise);

		$divTagCategory.append($divTagTimePraiseContainer);

		$aTag.append($divTagCategory);


		$itemContainer.append($divTag);

	}





});




