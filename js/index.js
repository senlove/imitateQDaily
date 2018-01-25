$(function() {

    swiperInit();

    allCategoryOnclick();

    getIndexData();

    scrollBottomListener();


});


// 一个范围的随机数
function rnd(n, m) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
}

var hostname = 'http://localhost:8081';

// swiper 初始化
function swiperInit() {

    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        autoplay: 2000,
        loop: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        pagination: '.swiper-pagination'
    });


    var $mySwiper = $('.swiper-container');
    var $mySwiperPre = $('.swiper-button-prev');
    var $mySwiperNext = $('.swiper-button-next');
    // var $mySwiperPre = $('.my-swiper-button-prev');
    // var $mySwiperNext = $('.my-swiper-button-next');

    $mySwiper.mouseenter(function() {
        mySwiper.stopAutoplay();
        // $mySwiperPre.show();
        // $mySwiperNext.show();
    });
    $mySwiper.mouseleave(function() {
        mySwiper.startAutoplay();
        // $mySwiperPre.hide();
        // $mySwiperNext.hide();
    });
}


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

function getIndexData(){
    $.get(hostname + '/indexData', function(data) {
        var indexData = JSON.parse(data);
        var loopEntryList = indexData.loopEntrylist;
        var itemDataList = indexData.itemDataList;

        initSwiperItemData(loopEntryList);
        initItemToHtml(itemDataList);
    });
}


function initSwiperItemData(loopEntryList) {

    var $swiperWrapper = $('.swiper-wrapper');

    for (var i = 0; i < loopEntryList.length; i++) {
        var loopEntry = loopEntryList[i];

        var firstDesc = "";
        var secondDesc = "";
        if (loopEntry.desc.length > 30) {
            firstDesc = loopEntry.desc.substring(0, 30);
            secondDesc = loopEntry.desc.substring(30);
        } else {
            secondDesc = loopEntry.desc;
        }

        var $swiperSlide = $('<div class="swiper-slide"></div>');


        var swipeItemContainerTxt = '<div class="swiper-slide-item-container">' +
            '<a href=""><img src="' + loopEntry.imgUrl + '"></a>' +
            '<a class="swiper-slide-item-container-category" href="#">' + loopEntry.category + '</a>' +
            '<a class="swiper-slide-item-container-title-first" href="#">' + firstDesc + '</a>' +
            '<a class="swiper-slide-item-container-title-second" href="#">' + secondDesc + '</a>' +
            '</div>';

        // var swipeItemContainerTxt = '<div class="swiper-slide-item-container">'+
        // 								'<a href=""><img src="'+swiperItemData.imgSrc+'"></a>'+
        // 								'<a class="swiper-slide-item-container-category" href="#">'+swiperItemData.category+'</a>'+
        // 								'<a class="swiper-slide-item-container-title" href="#">'+swiperItemData.desc+'</a>'+	
        // 							'</div>';
        // var swipeItemContainerTxt = `<div class="swiper-slide-item-container">\
								// 	<a href=""><img src="${swiperItemData.imgSrc}"></a>\
								// 	<a class="swiper-slide-item-container-category" href="#">${swiperItemData.category}</a>\
								// 	<a class="swiper-slide-item-container-title" href="#">${swiperItemData.desc}</a>\
								// 	</div>`;

        $swiperSlide.html(swipeItemContainerTxt);
        $swiperWrapper.append($swiperSlide);
    }
}


function initItemToHtml(itemDataList){
    var $itemContainer = $('.item-container');
    var $ulTag = $('<ul class=ul-item-container></ul>');
    $itemContainer.append($ulTag);
    addItemToHtml(itemDataList);
}


var lineCount = 0;

function addItemToHtml(dataList) {

	var $ulTag = $('.ul-item-container');
    var tempBidDataArrs = new Array();

    for (var i = 0; i < dataList.length; i++) {
        var itemData = dataList[i];

        if (200 != itemData.type && lineCount <= 2 && tempBidDataArrs.length > 0) {

            var bigItemData = tempBidDataArrs.shift();
            lineCount = lineCount + 2;
            var $liTag = createLargeItem(itemData);
            $ulTag.append($liTag);

            lineCount++;
            container = createNormalItem(itemData);
            var $liLargeTag = $('<li></li>');
            $ulTag.append($liLargeTag);


        } else {

            if (100 === itemData.type) {
                lineCount++;
                var $liTag = createNormalItem(itemData);
                $ulTag.append($liTag);

            } else if (200 === itemData.type) {
                lineCount = lineCount + 2;

                if (lineCount > 4) { //移到下一行
                    tempBidDataArrs.push(itemData);
                    lineCount = lineCount - 2;
                    continue;
                }

                var $liTag = createLargeItem(itemData);
                $ulTag.append($liTag);
            }
        }

        if (4 === lineCount) {
            lineCount = 0;
        }

    }

}


function createNormalItem(itemData){
	//这样的方式还是觉得麻烦
	var itemStartStr = '<div class="item-normal item-margin-right">';
	if(4 === lineCount) {
		itemStartStr = '<div class="item-normal">';
	}

	var itemOtherStr = '<a href=>'+
							'<div class=item-normal-category>'+
								'<span>商业</span>'+
							'</div>'+
							'<img src="'+itemData.imgSrc+'">'+
							'<div class=item-normal-txt>'+
								'<span>'+itemData.desc+'</span>'+
							'</div>'+
							'<div class=item-time-comment-praise>'+
								'<span>刚刚</span>'+
								'<div class=item-normal-praise>'+
									'<span>'+itemData.commentCount+'</span>'+
									'<span>'+itemData.praiseCount+'</span>'+
								'</div>'+
							'</div>'+
						'</a>'+
					'</div>';

	var itemStr = itemStartStr + itemOtherStr;
	var $liTag = $('<li></li>');
	$liTag.html(itemStr);
	return $liTag;
}


function createLargeItem(itemData){
	//这样的方式还是觉得麻烦
	var itemStartStr = '<div class="item-normal item-large item-margin-right">';
	if(4 === lineCount) {
		itemStartStr = '<div class="item-normal item-large">';
	}

	var itemOtherStr = '<a href=>'+
							'<div class=item-normal-category>'+
								'<span>商业</span>'+
							'</div>'+
							'<img src="'+itemData.imgSrc+'">'+
							'<div class=item-normal-txt>'+
								'<span>'+itemData.desc+'</span>'+
							'</div>'+
							'<div class="item-time-comment-praise item-large-time-comment-praise">'+
								'<span>刚刚</span>'+
								'<div class=item-normal-praise>'+
									'<span>'+itemData.commentCount+'</span>'+
									'<span>'+itemData.praiseCount+'</span>'+
								'</div>'+
							'</div>'+
						'</a>'+
					'</div>';

	var itemStr = itemStartStr + itemOtherStr;
	var $liTag = $('<li></li>');
	$liTag.html(itemStr);
	return $liTag;
}



var loadmoreCount = 0;

function scrollBottomListener() {

    var isLoading = false;

    $(window).scroll(function() {


        //隐藏显示的全部分类
        hideShowedAllCategory();
        scaleHeadHeight(this);

        var $window = $(this);
        //滚动条距离顶部的距离
        var scrollTop = $window.scrollTop();
        //滑到底部的处理

        var visibleHeight = $window.height();
        // var scrollHeight = $window[0].scrollHeight;
        var scrollHeight = $(document).height();

        // console.log(scrollTop);

        if (!isLoading && visibleHeight + scrollTop >= scrollHeight && 2 !== loadmoreCount) {
            isLoading = true;

            $('.loading').css('display', 'block');
            $('.loading li').addClass('animated zoomIn');

            //加载数据	
            //程序停止几秒
            setTimeout(function() {

                $.get('http://localhost:8081/itemList', function(data) {

                	var moreArrs = JSON.parse(data);
                	console.log(moreArrs.length);
                	// addLiTag(moreArrs);
                	addItemToHtml(moreArrs);
                	$('.loading').css('display', 'none');
                	isLoading = false;
                	loadmoreCount++;
                });
            }, 3000);

        }
    });

}

function hideShowedAllCategory() {
    if ($(".head_category_list_container").is(':visible')) {
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

    if (scrollTop > 0) { //变小

        if ($('.head').height() > 60 && !isDimishing) {

            isDimishing = true;

            $('.head_left_logo').height(60);
            $('.head_left_logo').width(120);
            $('.head_left_logo_icon').css('display', 'inline-block');
            $('.head_left_logo_icon').width(15);
            $('.head_left_logo_icon').height(30);
            $('.head_left_logo_txt').css('display', 'inline-block');

            $('.head').stop(false, true).animate({ 'height': '60' }, 'slow', function() {

                $('.head_right').width(520);
                $('.head_center').css('margin-right', 520);
                $('.head_right_login').css('display', 'flex');

                isDimishing = false;

            });
        }

    } else { //变大

        if (!isLarging) {
            isLarging = true;

            $('.head_right').width(350);
            $('.head_center').css('margin-right', 350);
            $('.head_right_login').hide();

            $('.head').stop(false, true).animate({ 'height': '80' }, 'slow', function() {

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
    if (scrollTop > 0) { //滚出顶部
        $('.head_right').width(520);
        $('.head_center').css('margin-right', 520);
        $('.head_right_login').css('display', 'flex');
    } else {
        $('.head_right').width(350);
        $('.head_center').css('margin-right', 350);
        $('.head_right_login').hide();
    }
}