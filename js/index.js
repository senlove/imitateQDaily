

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
	var $ulTag = $('<ul></ul>');
	$itemContainer.append($ulTag);
	var htmlTemp = '';
	htmlTemp += '<ul>';

	for(var i=0; i<arrs.length; i++){
		var itemData = arrs[i];
		htmlTemp += '<li><div class="item-normal"><a href="';
		if (typeof (arrs.link) != 'undefined') {
			htmlTemp += arrs.link;
		} else {
			htmlTemp += 'javascript:;';
		}
		htmlTemp += '"><div class="item-normal-category"><span>';
		if (typeof (arrs.tagCategory) != 'undefined') {
			htmlTemp += arrs.tagCategory;
		} else {
			htmlTemp += '商业';
		}
		htmlTemp += '</span></div><img src="';
		if (itemData.imgSrc != '') {
			htmlTemp += itemData.imgSrc;
		} else {
			// TODO default img
			htmlTemp += '';
		}
		htmlTemp += '"><div class="item-normal-txt"><span>';
		if (itemData.desc != '') {
			htmlTemp += itemData.desc;
		} else {
			// TODO default desc
			htmlTemp += '';
		}
		htmlTemp += '</span><div class="item-time-comment-praise"><span>';
		if (typeof (arrs.tagTime) != 'undefined') {
			htmlTemp += arrs.tagTime;
		} else {
			htmlTemp += '刚刚';
		}
		htmlTemp += '</span><div class="item-normal-praise"><span>';
		htmlTemp += itemData.commentCount + '</span><span>';
		htmlTemp += itemData.praiseCount + '</span></div></div></div></a></div></li>';
	}
	htmlTemp += '</ul>';
	// jquery
	$itemContainer.html(htmlTemp);
});




