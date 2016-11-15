//var baseUrl="http://172.16.41.212:8080";//chenying
  //js获取项目根路径，如： http://localhost:8083/uimcardprj
function getRootPath(){
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return localhostPaht;
}
var baseUrl = getRootPath();
//扩展Date的format方法   
Date.prototype.format = function (format) {  
    var o = {  
        "M+": this.getMonth() + 1,  
        "d+": this.getDate(),  
        "h+": this.getHours(),  
        "m+": this.getMinutes(),  
        "s+": this.getSeconds(),  
        "q+": Math.floor((this.getMonth() + 3) / 3),  
        "S": this.getMilliseconds()  
    };  
    if (/(y+)/.test(format)) {  
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    }  
    for (var k in o) {  
        if (new RegExp("(" + k + ")").test(format)) {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  
    return format;  
};
var utils={
		/**
		 * 获取父页面传过来的参数
		 * @param item 
		 * 参数名
		 * 使用Request.QueryString("item")获取参数
		 */
		getParam:function(item){
			var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
			return svalue ? decodeURI(svalue[1]) : null;
		},
		/**
		convert string to object of json
		**/
		stringToJson:function(str){
			if(null == str){
				str = 'null';
			}
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(str);
            }
		},
		/**
		convert object of json to string
		**/
        jsonToString: function(obj) {
            if (window.JSON && window.JSON.stringify) {
                return window.JSON.stringify(obj);
            }
        },
        /**
         * 生成一个GUID
         * @returns {String}
         */
        genGuid:function() {
            var S4 = function() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        },
        getPhoneName:function(){
			var phoneName = 'unknown';
			if(window.device){
				phoneName = window.device.name;
			}
			return phoneName;
		},
		/**
		 * 合并数组
		 */
		mergeArray:function(arr1,arr2){
			return arr1.concat(arr2);
		},
		//去掉字符串空格
		removeStrBlank:function(_str){
			if(_str == null || _str == undefined){
				return;
			}
			
			var tmpStr = _str;
			tmpStr = tmpStr.replace(/\s/g,"");

			return tmpStr;
		},
		/**
		 * 将null与undefined字段转为''
		 * 确保返回数据格式为字符串
		 */
		killNull:function(str){
			return str===null||str===undefined||str==='null'?'':str+'';
		},
		/**
		 * 判断对象是否为null，undefined，''
		 */
		isEmpty:function(str){
			if (str !== null && str !== undefined && str !== "undefined" && str !== '' && str !== "null") { 
				return false;
			}else{
				return true;
			}
		},
		/**
		 * 判断数组对象是否为null，undefined，长度为0
		 */
		isArrEmpty:function(arr){
			return arr===null||arr===undefined||arr.length==0;
		},
		/**
		 * 判断字符串中是否包含中文
		 */
		isHasChinese:function(str){
			if(escape(str).indexOf("%u")<0){   
				return false;
			}else{  
				return true; 
			}  
		},
		/**
		 * 替换字符串
		 * str 要被替换的内容
		 * str1 替换的后的内容
		 * str2 完整字符串
		 */
		replaceStr:function(str,str1,str2){
			return str2.replace(str, str1);
		},
		/** 
		 * 检查字符串是否为合法手机号码 
		 * @param {String} 字符串 
		 * @return {boolean} 是否为合法手机号码 
		 */  
		isPhone:function(phoneNo) {  
//			 var rex="/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/";
		     var bValidate = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/).test(phoneNo);  
		     if (bValidate) {  
		         return true;  
		     }  
		     else  
		    return false;  
		 },
		 /** 
		 * 检查字符串是否为合法email地址 
		 * @param {String} 字符串 
		 * @return {boolean} 是否为合法email地址 
		 */  
		isEmail:function(email) {  
		     var bValidate = RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(email);  
		     if (bValidate) {  
		         return true;  
		     }  
		     else  
		         return false;  
		 },
		 /** 
		 * 检查字符串是否是整数 
		 * @param {String} 字符串 
		 * @return {boolean} 是否是整数 
		 */  
		 isInteger:function(s){  
		     var isInteger = RegExp(/^[0-9]+$/);  
		     return (isInteger.test(s));  
		 },
		 /**
			 * 根据format获取时间格式
			 */
			getNowTime:function(format){
				var d = new Date();
				var o = {   
					     "M+" : d.getMonth()+1, //month   
					     "d+" : d.getDate(),    //day   
					     "h+" : d.getHours(),   //hour   
					     "m+" : d.getMinutes(), //minute   
					     "s+" : d.getSeconds(), //second   
					     "q+" : Math.floor((d.getMonth()+3)/3), //quarter   
					     "S" : d.getMilliseconds() //millisecond   
				}   
				if(/(y+)/.test(format)) {
					format=format.replace(RegExp.$1, (d.getFullYear()+"").substr(4 - RegExp.$1.length));   
				}
				for(var k in o) {
					if(new RegExp("("+ k +")").test(format)){   
						format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
					}
				}
				return format;
			},
		 /**   
		 *转换日期对象为日期字符串   
		 * @param date 日期对象   
		 * @param isFull 是否为完整的日期数据,   
		 *               为true时, 格式如"2000-03-05 01:05:04"   
		 *               为false时, 格式如 "2000-03-05"   
		 * @return 符合要求的日期字符串   
		 */    
		 getSmpFormatDate:function(date, isFull) {  
		     var pattern = "";  
		     if (isFull == true || isFull == undefined) {  
		         pattern = "yyyy-MM-dd hh:mm:ss";  
		     } else {  
		         pattern = "yyyy-MM-dd";  
		     }  
		     return utils.getFormatDate(date, pattern);  
		 },

		 /**   
		 *转换当前日期对象为日期字符串   
		 * @param date 日期对象   
		 * @param isFull 是否为完整的日期数据,   
		 *               为true时, 格式如"2000-03-05 01:05:04"   
		 *               为false时, 格式如 "2000-03-05"   
		 * @return 符合要求的日期字符串   
		 */    
		 getSmpFormatNowDate:function(isFull) {  
		     return utils.getSmpFormatDate(new Date(), isFull);  
		 },

		 /**   
		 *转换long值为日期字符串   
		 * @param l long值   
		 * @param isFull 是否为完整的日期数据,   
		 *               为true时, 格式如"2000-03-05 01:05:04"   
		 *               为false时, 格式如 "2000-03-05"   
		 * @return 符合要求的日期字符串   
		 */    
		 getSmpFormatDateByLong:function(l, isFull) {  
		     return utils.getSmpFormatDate(new Date(l), isFull);  
		 },

		 /**   
		 *转换long值为日期字符串   
		 * @param l long值   
		 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss   
		 * @return 符合要求的日期字符串   
		 */    
		 getFormatDateByLong:function(l, pattern) {  
		     return utils.getFormatDate(new Date(l), pattern);  
		 },
		 /**   
		 *转换日期对象为日期字符串   
		 * @param l long值   
		 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss   
		 * @return 符合要求的日期字符串   
		 */    
		 getFormatDate:function(date, pattern) {  
		     if (date == undefined) {  
		         date = new Date();  
		     }  
		     if (pattern == undefined) {  
		         pattern = "yyyy-MM-dd hh:mm:ss";  
		     }  
		     return date.format(pattern);  
		 },
		/**
		 * 字符串转化日期类型，判断当前是星期几
		 */
		stingToWeek:function(dateStr){
			var _weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
			var _dateValue = new Date(Date.parse(dateStr.replace(/-/g, "/"))); 
			return _weekDay[_dateValue.getDay()];
		},
		identityCodeValid:function(code) {
		var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
		var tip = "";
		var pass = true;
		//   /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
		if (!code||!/^[a-z0-9]{15}$|^[a-z0-9]{18}$/i.test(code)) {
			tip = "身份证号格式错误";
			pass = false;
		}

		else if (!city[code.substr(0, 2)]) {
			tip = "地址编码错误";
			pass = false;
		} else {
			// 18位身份证需要验证最后一位校验位
			if (code.length == 18) {
				code = code.split('');
				// ∑(ai×Wi)(mod 11)
				// 加权因子
				var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8,
						4, 2 ];
				// 校验位
				var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for (var i = 0; i < 17; i++) {
					ai = code[i];
					wi = factor[i];
					sum += ai * wi;
				}
				var last = parity[sum % 11];
				if (parity[sum % 11] != code[17]) {
					tip = "校验位错误";
					pass = false;
				}
			}
		}
//		if (!pass)
//			alert(tip);
		return pass;
	}
};
/**
 * 判断系统名称
 * 
 * @returns {String} 系统名称
 */
function checkSystem(){
	var ua = (navigator.userAgent || navigator.vendor || window.opera);
	if (ua!=null) {
		var uaName = ua.toLowerCase();
		// 安卓操作系统
		if (/android/i.test(uaName)){
			return "android";
		}else{
			// 苹果操作系统
			if (/ip(hone|od)/i.test(uaName)){
				return  "ios";
			}else {
				//塞班操作系统
				if (/symbian/i.test(uaName)){
						return "symbian";
				} else {
					//windows phone 操作系统
					if (/windows (ce|phone)/i.test(uaName)){
						return "windows";
						//pc机器
					}else{
						return "pc";
					} 
				}
			}	
		}
	}
	return "";
}
function jumpTo(url){
	var ua = (navigator.userAgent || navigator.vendor || window.opera);
	if (ua!=null) {
		var uaName = ua.toLowerCase();
		//安卓操作系统
		if (/android/i.test(uaName)){
//			window.ActInterface.openDetail(url);
			window.location.href = url;
		}else{
			//苹果操作系统
			if (/ip(hone|od)/i.test(uaName)){
				window.location.href = url;
			}else {
				//塞班操作系统
				if (/symbian/i.test(uaName)){
					
				} else {
					//windows phone 操作系统
					if (/windows (ce|phone)/i.test(uaName)){
					//pc机器
					}else{
						window.location.href = url;
					} 
				}
			}	
		}
	}
}