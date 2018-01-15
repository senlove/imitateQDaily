$(function() {

    swiperInit();

    allCategoryOnclick();


    loadSwiperItemData();
    loadItemData();

    scrollBottomListener();


});


// 一个范围的随机数
function rnd(n, m) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
}

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


function SwipeItemData() {

}

SwipeItemData.prototype = {
    imgSrc: "",
    desc: "",
    category: ""
}

function createSwipeItemData() {
    var categorys = [
        "科技",
        "设计",
        "时尚",
        "智能"
    ];

    var imgs = [
        "http://img.qdaily.com/article/banner/20171019073128xt3AnFg6G79azfP8.jpg?ima…!755x450r/gravity/Center/crop/755x450/quality/85/format/jpg/ignore-error/1",
        "http://img.qdaily.com/article/banner/201710192050155gcIRKBTWwz2x6DU.jpg?ima…!755x450r/gravity/Center/crop/755x450/quality/85/format/jpg/ignore-error/1",
        "http://img.qdaily.com/article/banner/20171020001900Ih8P7rxCS0kbMRyt.jpg?ima…!755x450r/gravity/Center/crop/755x450/quality/85/format/jpg/ignore-error/1",
        "http://img.qdaily.com/article/banner/20171018194044zEc750JhSsKlAjMF.jpg?ima…!755x450r/gravity/Center/crop/755x450/quality/85/format/jpg/ignore-error/1"
    ];

    var descs = [
        "搜狗终于要上市了，9 张图带你看那一代老派互联网科技公司的起落",
        "员工身心健康也是企业竞争力，办公室设计在这一点上怎么配合？｜我们的办公室④",
        "“全球时尚行业至少五分之一的消费者都聚集在中国”",
        "双中子星并合，“宇宙最大烟火表演”激动人心，我们看待宇宙的方式要变了吗？",
    ];

    var dataArrs = new Array();

    for (var i = 0; i < imgs.length; i++) {
        var categoryItem = categorys[i];
        var imgsItem = imgs[i];
        var descItem = descs[i];

        var swipeItemData = new SwipeItemData();
        swipeItemData.category = categoryItem;
        swipeItemData.imgSrc = imgsItem;
        swipeItemData.desc = descItem;

        dataArrs.push(swipeItemData);

    }

    return dataArrs;
}

function loadSwiperItemData() {
    var swipeItemDataArrs = createSwipeItemData();

    var $swiperWrapper = $('.swiper-wrapper');

    for (var i = 0; i < swipeItemDataArrs.length; i++) {
        var swiperItemData = swipeItemDataArrs[i];

        var firstDesc = "";
        var secondDesc = "";
        if (swiperItemData.desc.length > 30) {
            firstDesc = swiperItemData.desc.substring(0, 30);
            secondDesc = swiperItemData.desc.substring(30);
        } else {
            secondDesc = swiperItemData.desc;
        }

        var $swiperSlide = $('<div class="swiper-slide"></div>');


        var swipeItemContainerTxt = '<div class="swiper-slide-item-container">' +
            '<a href=""><img src="' + swiperItemData.imgSrc + '"></a>' +
            '<a class="swiper-slide-item-container-category" href="#">' + swiperItemData.category + '</a>' +
            '<a class="swiper-slide-item-container-title-first" href="#">' + firstDesc + '</a>' +
            '<a class="swiper-slide-item-container-title-second" href="#">' + secondDesc + '</a>' +
            '</div>';

        // var swipeItemContainerTxt = '<div class="swiper-slide-item-container">'+
        // 								'<a href=""><img src="'+swiperItemData.imgSrc+'"></a>'+
        // 								'<a class="swiper-slide-item-container-category" href="#">'+swiperItemData.category+'</a>'+
        // 								'<a class="swiper-slide-item-container-title" href="#">'+swiperItemData.desc+'</a>'+	
        // 							'</div>';
        var swipeItemContainerTxt = `<div class="swiper-slide-item-container">\
									<a href=""><img src="${swiperItemData.imgSrc}"></a>\
									<a class="swiper-slide-item-container-category" href="#">${swiperItemData.category}</a>\
									<a class="swiper-slide-item-container-title" href="#">${swiperItemData.desc}</a>\
									</div>`;

        $swiperSlide.html(swipeItemContainerTxt);
        $swiperWrapper.append($swiperSlide);
    }
}


function loadItemData() {
    createDataFromNet();
}


function createDataFromNet() {
    $.get('http://localhost:8081/itemList', function(data) {
        var itemList = JSON.parse(data);
        var $itemContainer = $('.item-container');
        var $ulTag = $('<ul class=ul-item-container></ul>')
        $itemContainer.append($ulTag);
        addItemToHtml(itemList);
    });
}


var lineCount = 0;

function addItemToHtml(dataList) {

	var $ulTag = $('.ul-item-container');
    var tempBidDataArrs = new Array();

    for (var i = 0; i < dataList.length; i++) {
        var itemData = dataList[i];

        if (200 != itemData.type && lineCount <= 2 && tempBidDataArrs.length > 0) {

            var bigItemData = tempBidDataArrs.shift();
            lineCount = lineCount + 2
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
					'</div>'

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
					'</div>'

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
    })

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
                $('.head_center').css('margin-right', 520);;
                $('.head_right_login').css('display', 'flex');

                isDimishing = false;

            });
        }

    } else { //变大

        if (!isLarging) {
            isLarging = true;

            $('.head_right').width(350);
            $('.head_center').css('margin-right', 350);;
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
        $('.head_center').css('margin-right', 520);;
        $('.head_right_login').css('display', 'flex');
    } else {
        $('.head_right').width(350);
        $('.head_center').css('margin-right', 350);;
        $('.head_right_login').hide();
    }
}