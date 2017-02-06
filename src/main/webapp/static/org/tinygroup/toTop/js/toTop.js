/*返回顶部*/
$(function(){	
	var $backToTopTxt="返回顶部";
	$backToTopEle=$('<a href="javascript:void(0)" class="toTop" title=backToTopTxt alt=backToTopTxt></a>').appendTo($("body")).text($backToTopTxt).attr("title", $backToTopTxt).click(function(){$("html, body").animate({ scrollTop: 0 }, 120);}), $backToTopFun = function() {var st = $(document).scrollTop(), winh = $(window).height();(st > 0)? $backToTopEle.show(): $backToTopEle.hide();/*IE6下的定位*/if(!window.XMLHttpRequest){$backToTopEle.css("top", st + winh - 166);}};
	$(window).bind("scroll", $backToTopFun);
	$backToTopFun();
});