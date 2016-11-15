/*方案已*/
String.prototype.queryURLParameter = function () {
    //->获取截取的开始和结束索引
    var strIndex = this.indexOf("?"),
        endIndex = this.lastIndexOf("#"),
        resStr = "";

    //->检测字符串中是否包含?和#
    if (strIndex > -1) {
        if (endIndex === -1) {
            resStr = this.substring(strIndex + 1);
        } else {
            resStr = this.substring(strIndex + 1, endIndex);
        }
    }

    //->开始进行字符串的拆分和拼接
    var ary = resStr.split("&"),
        obj = {};
    for (var i = 0; i < ary.length; i++) {
        var cur = ary[i],
            curAry = cur.split("=");
        obj[curAry[0]] = curAry[1];
    }
    return obj;
};
//console.log(str.queryURLParameter());

/*方案二*/
String.prototype.queryURLParameter1 = function () {
    var obj = {},
        reg = /([^?=&#]+)=([^?=&#]+)/g;
    this.replace(reg, function () {
        var key = arguments[1],
            value = arguments[2];
        obj[key] = value;
    });
    return obj;
};
//console.log(str.queryURLParameter1());