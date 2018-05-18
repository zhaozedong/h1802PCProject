 //随机输入一个正整数，倒序出来
function reverse(number){
	var arr=[];
	do{
		var num=number%10;
			arr.push(num);
			number=	Math.floor(number/10);

	}while(number>0)
	return reverse(arr);
}
// 打印日历相关函数封装
// one判断润或平年
function isLeapYear(year) {
	return year%4==0&&year%100!==0||year%400==0;
}
// two计算某年某月有多少天
function calcYearMonth(year,month){
	var day;
	switch(month){
		case 2:
			day=isLeapYear(year)?29:28;
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			day=30;
			break;
		default:
			day=31;
	}
	return day;
} 
// three计算某年某月的第一天是当年的第多少天
function calcYearDays(year,month){
	var sum=1;
	for (var i = 1;i<month; i++) {
		day+=calcYearMonth(year,i)
	}
	return sum;
}
// four计算某年某月的第一天距1900年1-1的多少天
function calcTotalDays(year,month){
	var total=calcYearDays(year,month);
		for (var i = 1900; i <year; i++) {
			total+=isLeapYear(i)?366:365;
		}
	return total;
}
//计算某年某月的第一天是星期几
function calcweekends(year,month){
	return calcTotalDays(year,month)%7;
}
// 打印日历
function printcalendar(year,month){
	var calendar="日\t一\t二\t三\t四\t五\t六\n";
	var weekys=calcweekends(year,month);
	// 打印空格  空格跟第一天是星期几有关
	for (var i = 1; i <=weekys; i++) {
		calendar+=" \t"
	}

	var days=calcYearMonth(year,month);
	for (var i =1; i<=days; i++) {
		calendar+=i+"\t"

		if((weekys+i)%7==0)
			calendar+="\n"
	}
	return calendar;
}
//随机[x,y]范围数字
function random(x,y){
	return 	Math.floor(Math.random()*(y-x)+x)
}
// 随机背景色
function randomColor() {
				var arr=[];
				for (var i = 0; i<3; i++) {
					arr.push(Math.floor(Math.random()*256));
				}
				return "rgb("+arr+")";

			}
//将url中的查找字符串转为对象
function parseQueryString(url){
	//查找？与#
	var start=indexOff("?"),
		end=indexOff("#");
	//判断是否存在
	if(start==-1)
		return null;
	start+=1;
	if(end==-1)
		end=url.length
	//获取查找字符串
	var result=[];
	var querystring=url.slice(start,end);
		querystring=querystring.split("&");
		for (var i =0; i<querystring.length; i++) {
			var parts=querystring[i].split("=");
			result[parts.shift()]=parts.shift();
		}
		return result;
}
//将对象转换为查询字符串
function toQueryString(obj){
	//定义变量保存装换后的结果
	var result=[];
	for (var attr in obj) {
		result.push(attr+"="+obj[attr])

	}
	return result.join("&");
	
}
//添加事件监听并解决兼容性问题
function on(element,type,callback){
	if(element.addEventListener){
		if(type.indexOf("on")==0)
			type=type.slice(2)
		 element.addEventListener(type,callback,false)
	}else{
		if(type.indexOf("on")!==0)
			type="on"+type;
		element.attachEvent(type,callback)	

	}
}
//移除事件监听解决兼容性问题
function off(element,type,callback){
	if(element.removeEventListener){
		if(type.indexOf("on")==0)
			type=type.slice(2);
		element.removeEventListener(type,callback,false)
	}else{
		if(type.indexOf("on")!==0)
			type="on"+type;
		element.detachEvent(type,callback)
	}

}
// 寻找类名函数封装解决兼容性问题
function $(selector,context){
	// 默认在全文档里查找
	context=context||document;
	if(selector.charAt(0)=="#")
		return document.getElementById(selector.slice(1));
	if(selector.charAt(0)==".")
		return byClass(selector.slice(1),context);
	return context.getElementsByTagName(selector);
}
function byClass(className,context){
	context=context||document;
	// 支持则直接使用
	if(context.getElementsByClassName)
		return context.getElementsByClassName(className);
	// 声明一个变量保存所有查找到的元素
	var result=[];
	// 查找上下文中所有的元素
	var elements=context.getElementsByTagName("*")
	// 遍历所有元素。且判断元素类名
	for (var i =1; i <elements.length; i++) {
		var classNames=elements[i].className.split(" ")
		// 查找待查找类名
		for (var j =1; j<classNames.legth; j++) {
			if(classNames[j]==className){
				result.push(elements[i]);
				break;
			}
			
			
		}

	}
	return result;
}
//保存数据cookie函数
function cookie(key,value,options){
	// wrting
	if(typeof value!==undefined){
		// 判断键值对存在？将key和value连接

		var cookie=encodeURIComponent(key)+"="+encodeURIComponent(value);
		// 判断可选项
		options=options||{};
		// 判断有效时间
		if(options.expires){
			var datetime=new Date();
			// 设置时间
			datetime.setDate(datetime.getDate()+options.expires);
			// 连接
			cookie+=";expires="+datetime.toUTCString();
		}
		// 有路径
		if(options.path){
			cookie+=";path="+options.path;
		}
		// 有域
		if (options.domain) {
			cookie+=";domain="+options.domain;
		}
		// 有安全配置
		if(options.secure)
			cookie+=";secure";
		// 保存cookie
		document.cookie=cookie;
		return;

	}
	// reading读取cookie下所有的（key=value）保存在数组中
	var cookies=document.cookie.split("; ");
	// 遍历数组
	for (var i = 0; i < cookies.length; i++) {
		// 当前数组以=号分割
		var parts=cookies[i].split("=");
		// 第一个=号前是cookie名剩余地以等号链接作为cookie值
		// 解码
		var name=decodeURIComponent(parts[i].shift());
		// 判断当前cookie名是否否为待查找cookie名
		if(name==key){
			var value=decodeURIComponent(parts[i].join("="));
			return value;
		}

	}
	// 若没找到反回undefined
	return undefined;

}
function removeCookie(key, options) {
	options = options || {};
	options.expires = -1;
	cookie(key, "", options);
}
// 获取、设置css样式并解决兼容性问题
function css(element,attr,value){
	if(typeof attr=="object"){
		// 设置
		for (var i in attr) {
			element.style[i]=attr[i]
		}
		return;
	}
	// 获取
	if(typeof value=="undefined"){
		return window.getComputedStyle
				?window.getComputedStyle(element)[attr]
				:element.currentStyle[attr];
	}
	// 设置
	 element.style[attr]=value;


}
/*
 * 获取元素在文档中的定位坐标
 * @param element DOM元素对象
 * @return 返回元素在文档中的坐标对象，该对象有top与left两个属性
 */
function offset(element) {
	var _left = 0, _top = 0;
	while (element !== null) {
		_left += element.offsetLeft;
		_top += element.offsetTop;
		element = element.offsetParent;
	}

	return {
		top : _top,
		left : _left
	}
}

// 显示和隐藏函数封装
function show(element){
	element.style.display="block";
}
function hide(element){
	element.style.display="none";
}
// 运动函数封装
function animate(element, options, speed, fn) {
			// 停止元素上已有运动
			clearInterval(element.timer);
			// 定义变量保存初值、区间值
			var start = {}, range = {};
			for (var attr in options) {
				start[attr] = parseFloat(element.style[attr]);
				range[attr] = options[attr] - start[attr];
			}
			// 定义变量记录运动起始时间
			var startTime = +new Date();
			// 启动运动计时器
			element.timer = setInterval(function(){
				// 计算已运动经过的时间
				var elapsed = Math.min(+new Date() - startTime, speed);
				// 计算当前步各属性走到的值
				for (var attr in options) {
					// 当前遍历属性的值
					var result = elapsed * range[attr] / speed + start[attr];
					// 设置 css 样式
					element.style[attr] = result + (attr === "opacity" ? "" : "px");
				}
				// 判断是否停止计时器
				if (elapsed === speed){
					clearInterval(element.timer);
					// 判断是否有运动结束执行的函数，有则调用
					fn && fn();
				}
			}, 1000/60)
}
// 淡入
function fadeIn(element,speed,fn){
	element.style.display="block";
	element.style.opacity=0;
	animate(element,{opacity:1},speed,fn);

}
// 淡出	 
function fadeOut(element,speed,fn){
	animate(element,{opacity:0},speed,function(){
		element.style.display="none";
	})

}