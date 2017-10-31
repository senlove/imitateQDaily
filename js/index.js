



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


	var arrs = new Array();
	for(var i=0; i<6; i++){

		var itemData = new Object();
		itemData.imgSrc = "";
		itemData.desc = "两大浏览器将停止自动播放视频，这对广告行业有什么影响？";
		itemData.publishTime = 1509441932132;//毫秒做单位
		itemData.commentCount = 10;
		itemData.praiseCount = 15;	

		arrs.push(itemData);
	}



});

