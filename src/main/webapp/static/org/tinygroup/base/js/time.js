jQuery.getDateDiff = function (dateTimeStamp) {
    var result = '';
    if (isNaN(dateTimeStamp)) {
        return result;
    }
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    //var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
        return '';
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC > 12) {
        result = "很久很久以前";
    } else if (monthC >= 1) {
        result = parseInt(monthC) + "个月前";
    } else if (weekC >= 1) {
        result = parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = parseInt(hourC) + "个小时前";
    } else if (minC >= 1) {
        result = parseInt(minC) + "分钟前";
    } else {
        result = "刚刚";
    }
    return result;
};

function dateFormatter(value, dateformat) {
    if (typeof(dateformat) == "undefined"||typeof(dateformat) == "object") {
        dateformat = "YYYY-MM-DD";
    }
    return moment(value).format(dateformat);
}

function timeFormatter(value) {
   return dateFormatter(value,"YYYY-MM-DD HH:mm:ss");
}