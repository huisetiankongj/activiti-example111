$(function(){
    $('.animated-delay[data-animate]').each(function () {
        var This = $(this)
        var delayTime = This.data('animate');
        var delayAnimation = 'fadeIn';
        if (delayTime.length > 1 && delayTime.length < 3) {
            delayTime = This.data('animate')[0];
            delayAnimation = This.data('animate')[1];
        }
        var delayAnimate = setTimeout(function () {
            This.removeClass('animated-delay').addClass('animated ' + delayAnimation).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                This.removeClass('animated ' + delayAnimation);
            });
        }, delayTime);
    });
})