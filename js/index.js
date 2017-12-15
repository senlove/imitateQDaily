

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

	allCategoryOnclick();

	loadItemData();

	scrollBottomListener();


});


// 全部分类的点击事件
function allCategoryOnclick() {
	$(".head_center_all_category").click(function(event) {

		//三角形发生旋转
		var $triangleImg = $(this).find("img");
		$(".head_category_list_container").toggle();
		// $(".head_category_list_container").show();

		return false;
	});
}



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



var lineCount = 0;	
function loadItemData(){

		var arrs = createData(descArrays, imgArrays, 20);

		var $itemContainer = $('.item-container');
		var $ulTag = $('<ul class=ul-item-container></ul>')
		$itemContainer.append($ulTag);

		var tempBidDataArrs = new Array();

		for(var i=0; i<arrs.length; i++){
			var itemData = arrs[i];

			var container = "";

			if(200 != itemData.type && lineCount <= 2 && tempBidDataArrs.length > 0){

				var bigItemData = tempBidDataArrs.shift();
				lineCount = lineCount + 2
				container = createTagItem(itemData, 200, lineCount);
				var $liTag = $('<li></li>');
				$liTag.html(container);
				$ulTag.append($liTag);

				lineCount ++;
				container = createTagItem(itemData, 100, lineCount);
				var $liTag = $('<li></li>');
				$liTag.html(container);
				$ulTag.append($liTag);


			} else {

				if(100 === itemData.type){
					lineCount ++;
					container = createTagItem(itemData, 100, lineCount);

					var $liTag = $('<li></li>');
					$liTag.html(container);
					$ulTag.append($liTag);

				} else if(200 === itemData.type){
					lineCount = lineCount + 2;
				
					if(lineCount > 4){ //移到下一行
						tempBidDataArrs.push(itemData);
						lineCount = lineCount - 2;
						continue;
					}

					container = createTagItem(itemData, 200, lineCount);


					var $liTag = $('<li></li>');
					$liTag.html(container);
					$ulTag.append($liTag);
				}
			}

			if(4 === lineCount){
				lineCount = 0;
			} 

		}

}

function createData(descArrays, imgArrays, arrsSize) {

	var arrs = new Array();
	for(var i=0; i<arrsSize; i++){

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

	return arrs;
}


function createTagItem(itemData, type, lineCount){
	var commentStr = '<span>'+itemData.commentCount+'</span>';
	var praiseStr = '<span>'+itemData.praiseCount+'</span>';
	//这里的class还是强依赖了，修改了css文件，这里也得跟着修改
	var divCommentPraise = '<div class="item-normal-praise">' + commentStr +　praiseStr+'</div>';



	var timeStr = '<span>刚刚</span>';
	var divTimeCommentPraise = '';
	if(200 === type){
		divTimeCommentPraise = '<div class="item-time-comment-praise item-large-time-comment-praise">'+ timeStr + divCommentPraise+'</div>';
	} else{
		divTimeCommentPraise = '<div class="item-time-comment-praise">'+ timeStr + divCommentPraise+'</div>';
	}

	var descStr = '<span>'+itemData.desc+'</span>';
	// var divTxt = '<div class="item-normal-txt">'+descStr+divTimeCommentPraise+'</div>';
	var divTxt = '<div class="item-normal-txt">'+descStr+'</div>';

	var img = '<img src="'+itemData.imgSrc+'">';

	var categoryStr = '<span>商业</span>';
	var divCategory = divCategory = '<div class="item-normal-category">'+categoryStr+'</div>';

	var aTag = '<a href="">'+divCategory+img+divTxt+divTimeCommentPraise+'</a>';

	if(200 === type){



		if(4 === lineCount){
			return '<div class="tem-normal item-large">'+aTag+'</div>';					
		}
		return '<div class="item-normal item-large item-margin-right">'+aTag+'</div>';
	} else{

		if(4 === lineCount) {
			return '<div class="item-normal">'+aTag+'</div>';
		}
		return '<div class="item-normal item-margin-right">'+aTag+'</div>';
	}
	

}

function addLiTag(arrs) {
	var $ulTag = $('.ul-item-container');
	var tempBidDataArrs = new Array();

	for(var i=0; i<arrs.length; i++){
		var itemData = arrs[i];

		var container = "";

		//这里有点恶心
		//一行有三个小item 加上一个大item的处理
		if(200 != itemData.type && lineCount <= 2 && tempBidDataArrs.length > 0){

			var bigItemData = tempBidDataArrs.shift();
			lineCount = lineCount + 2
			container = createTagItem(itemData, 200, lineCount);
			var $liTag = $('<li></li>');
			$liTag.html(container);
			$ulTag.append($liTag);

			lineCount ++;
			container = createTagItem(itemData, 100, lineCount);
			var $liTag = $('<li></li>');
			$liTag.html(container);
			$ulTag.append($liTag);


		} else {

			if(100 === itemData.type){
				lineCount ++;
				container = createTagItem(itemData, 100, lineCount);

				var $liTag = $('<li></li>');
				$liTag.html(container);
				$ulTag.append($liTag);

			} else if(200 === itemData.type){
				lineCount = lineCount + 2;
			
				if(lineCount > 4){ //移到下一行
					tempBidDataArrs.push(itemData);
					lineCount = lineCount - 2;
					continue;
				}

				container = createTagItem(itemData, 200, lineCount);


				var $liTag = $('<li></li>');
				$liTag.html(container);
				$ulTag.append($liTag);
			}
		}

		if(4 === lineCount){
			lineCount = 0;
		} 

	}

}

var loadmoreCount = 0;

function scrollBottomListener(){

	var isLoading = false;

	$(window).scroll(function(){


		//隐藏显示的全部分类
		hideShowedAllCategory();
		scaleHeadHeight(this);
		//滑出顶部的情况处理
		// showHideHeadLogin(this);

		var $window = $(this);
		//滚动条距离顶部的距离
		var scrollTop = $window.scrollTop();

		// var $icLogo = $('head_left_logo_icon');
		// if(scrollTop > 50){ //缩小
		
		// 	$icLogo.width($icLogo.width()*0.5);
		// 	$icLogo.height($icLogo.height()*0.5);

		// } else{ //变大
		// 	$icLogo.width($icLogo.width()*2);
		// 	$icLogo.height($icLogo.height()*2);
		// }


		//滑到底部的处理

		var visibleHeight = $window.height();
		// var scrollHeight = $window[0].scrollHeight;
		var scrollHeight = $(document).height();

		console.log(scrollTop);

		if(!isLoading && visibleHeight + scrollTop >= scrollHeight && 2 !== loadmoreCount) {
			isLoading = true;

			$('.loading').css('display', 'block'); 
			$('.loading li').addClass('animated zoomIn');

				//加载数据	
				//程序停止几秒
				setTimeout(function(){
					var moreArrs = createData(descArrays, imgArrays, 10);
					addLiTag(moreArrs);

					$('.loading').css('display', 'none'); 
					isLoading = false;
					loadmoreCount++;		
				}, 3000);

			}
		})

}

function hideShowedAllCategory() {
	if($(".head_category_list_container").is(':visible')){
		$(".head_category_list_container").hide();
	}
}

var isDimishing = false;
var isLarging = false;

function scaleHeadHeight(tagWindow) {
	var $window = $(tagWindow);
	//滚动条距离顶部的距离
	var scrollTop = $window.scrollTop();

	//隐藏、显示登录 head-left-logo 大小变化

	if(scrollTop > 0){ //变小

		if($('.head').height() > 60 && !isDimishing) {

			isDimishing = true;

			$('.head_left_logo').height(60);
			$('.head_left_logo').width(120);
			$('.head_left_logo_icon').css('display', 'inline-block');
			$('.head_left_logo_icon').width(15);
			$('.head_left_logo_icon').height(30);
			$('.head_left_logo_txt').css('display', 'inline-block');

			$('.head').stop(false, true).animate({'height': '60'}, 'slow', function() {

				$('.head_right').width(520);
				$('.head_center').css('margin-right', 520);;
				$('.head_right_login').css('display', 'flex');

				isDimishing = false;

			});
		}

	} else{//变大

		if(!isLarging){
			isLarging = true;

			$('.head_right').width(350);
			$('.head_center').css('margin-right', 350);;
			$('.head_right_login').hide();

			$('.head').stop(false, true).animate({'height': '80'}, 'slow', function() {

				$('.head_left_logo').height(120);
				$('.head_left_logo').width(90);
				$('.head_left_logo_icon').css('display', 'block');
				$('.head_left_logo_icon').width(30);
				$('.head_left_logo_icon').height(65);
				$('.head_left_logo_txt').css('display', 'block');

				isLarging = false;
			});

		}
	}

}


function showHideHeadLogin(tagWindow) {
	var $window = $(tagWindow);
	//滚动条距离顶部的距离
	var scrollTop = $window.scrollTop();


	//隐藏、显示登录
	if(scrollTop > 0){ //滚出顶部
		$('.head_right').width(520);
		$('.head_center').css('margin-right', 520);;
		$('.head_right_login').css('display', 'flex');
	} else{
		$('.head_right').width(350);
		$('.head_center').css('margin-right', 350);;
		$('.head_right_login').hide();
	}
}


