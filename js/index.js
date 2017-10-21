$(function () {
	
	$(".head_center_all_category").click(function(event) {

		//三角形发生旋转
		var $triangleImg = $(this).find("img");

		$(".head_category_list_container").toggle();
		return false;
	});

})