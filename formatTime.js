
~function (pro) {
    //->formatTime:用来把指定的时间字符串按照既定的模板格式进行格式化
    function formatTime(template) {
        //->template:我们用来格式化时间的模板,不传递的话也有一套默认的模板
        template = template || "{0}年{1}月{2}日 {3}时{4}分{5}秒";

        //->this是我们要格式化的时间字符串
        //1)把我们需要格式化的时间字符串中的数字都获取到,并且保存在一个数组中
        var ary = this.match(/\d+/g);

        //2)到既定的模板中获取{n}和对应的数字n,并且到ary中通过n获取到对应的内容,用获取的内容把{n}替换掉即可
        return template.replace(/\{(\d+)\}/g, function () {
            var index = arguments[1],
                item = ary[index];
            !item ? item = "00" : null;
            item.length < 2 ? item = "0" + item : null;
            return item;
        });
    }

    //->把方法扩展到内置类的原型上
    pro.formatTime = formatTime;
}(String.prototype);

var str = "2016-7-1 18:00:00";

str = str.formatTime();
console.log(str);//->"2016年07月01日 18时00分00秒"

str = str.formatTime("{0}年{1}月{2}日 {3}:{4}:{5}");
console.log(str);//->"2016年07月01日 18:00:00"

str = str.formatTime("{1}-{2} {3}:{4}");
console.log(str);  //   "07-01 18:00"