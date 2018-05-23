/****************************************/
//轮播图
/**************************************/
var lis=my$("li",my$("#small")),//找到所有轮播图片的盒子
		len=lis.length,//图片张数
		liWidth=lis[0].offsetWidth,//每个图片盒子的宽度
		currentindex=1,//当前播放图片的索引
		nextindex=2,//即将播放图片的索引
		timer=null,//计时器的id
		circles=null,//小圆点
		duration=3000;
		// 动态添加小圆点
		var html="";
		for (var i=0; i <len; i++) {
			html+="<i></i>"
		}
		my$("#pages").innerHTML=html;
		my$("i",my$("#pages"))[0].innerText="黑珍珠大樱桃";
		my$("i",my$("#pages"))[1].innerText="黑豆腐乳";
		my$("i",my$("#pages"))[2].innerText="洞庭虾尾";
		my$("i",my$("#pages"))[3].innerText="金福元卤豆干";
		my$("i",my$("#pages"))[4].innerText="美人窝里的土鸡蛋";
		//获取添加所有小圆点dom元素
		circles=my$("i",my$("#pages"));
		circles[0].className="current";
		//复制第一与最后一张图片并添加到ul#smallmy
		var first =lis[0].cloneNode(true),
			last =lis[len-1].cloneNode(true);
		my$("#small").appendChild(first);
		my$("#small").insertBefore(last, lis[0]);
		//图片数加2
		len+=2;
		 //设置#small的宽度
		 my$("#small").style.width=len*liWidth+"px";
		 my$("#small").style.left=-1*liWidth+"px";
		// 轮播函数
		 function move(){
		 	// 计算轮播的终点定位距离
		 	var _left=-1*nextindex*liWidth;
		  	// 运动动画
		  	animate(my$("#small"),{left:_left},200,function(){
		  		//判断运动结束是否回到原来位置
		  		if (currentindex==len-1){//最后
		  			currentindex=1;
		  			nextindex=2;
		  			my$("#small").style.left=-1*liWidth+"px";
		  		}
		  		else if(currentindex==0){//最前
		  			currentindex = len - 2;
					nextindex = len - 1;
					my$("#small").style.left = -1 * (len - 2) * liWidth + "px";
		  		}  

		  	});	
		 
				  	// 轮播过程中，切换小圆点样式
				// 设置为红色背景的小圆点索引
				var circlesindex=nextindex-1;
					if(circlesindex<0)
						circlesindex=len-3
					else if(circlesindex>=len-2)
						circlesindex=0;
					for (var i = 0; i<len-2; i++) {
						circles[i].className="";
						}		
					circles[circlesindex].className="current";
			  		// 修改索引
			  		currentindex=nextindex;
			  		nextindex++;
		 }
		//自动轮播
		timer=setInterval(move,duration)
		/* 鼠标移入/移出容器范围，停止/重启自动轮播 */
		my$(".box")[0].onmouseenter = function(){
			// 停止自动轮播
			clearInterval(timer);
		}
		my$(".box")[0].onmouseleave = function(){
			// 重启自动轮播
			timer = setInterval(move, duration);
		}
		/* 鼠标移入小圆点，切换 */
		my$("#pages").onmouseover = function(e){
			var src = e.target;
			if (src.nodeName === "I") {
				// 获取当前移入小圆点的索引
				var index = Array.from(circles).indexOf(src);
				// 设置 nextIndex
				nextindex = index+1;
				// 调用 move()
				move();
			}
		}
/*****************************************/
//扶贫专区效果
/********************************************/
$(function () {
	$(".swiper").on("mouseenter",".buy",function (e) {
		var index = $(this).children("._template").children(".id").text();
		$("._template").eq(index).stop().animate({bottom:0},1000);
	})
	$(".swiper").on("mouseleave",".buy",function () {
		$("._template").stop().animate({bottom:-30},1000)
	})
})

/****************************************************/
//扶贫专区购物车
/***********************************************/
$(function () {
	//使用ajax访问后端，获取数据
	$.ajax({
		type:"get",
		url:"mock/poor.json",
		dataType:"json",
		success:function (responseData) {//处理响应程序
			responseData.res_body.list.forEach(function (prod) {
				$(".template:eq(0)").clone()//克隆模板
							.removeClass("template").addClass("buy")//修改类名
							.css({display:"inline-block"})//设置css样式
							.appendTo(".swiper")//添加到盒子中
							.children("a").children(".img").attr("src",prod.img)//修改图片
							.parent("a").next("._template")
							.children(".desc").children("a").text(prod.desc)//描述
							.parent(".desc").next(".price")
							.children("a").find("i").text(prod.price1)
							.next("b").text(prod.price2)
							.parents(".price").next(".id").text(prod.id)//商品编号

			})
			
		}
	})
	//点击向前或前后翻
	var index=1;
		$(".next").click(function () {
			var _left=-1*index*307.5+"px";
			$(".swiper").css({left:_left})
			if(index<9)
			index++;
		})
		$(".prev").click(function () {
			var _left=-1*(index-1)*307.5+"px";
			$(".swiper").css({left:_left})
			if(index>1)
			index--;
		})
		if(index==1||index==9){
			$(".prev,.next").dblclick(function () {
				location.url="cart.html"
			})
			
		}

})
/*********************************************/
//原产品区
/***************************************/

$(function () {
	//使用ajax访问后端，获取数据
	$.ajax({
		type:"get",
		url:"mock/yuan.json",
		dataType:"json",
		success:function (responseData) {//处理响应程序
			responseData.res_body.list.forEach(function (prod) {
				$(".template:eq(0)",$("#right")).clone()//克隆模板
							.removeClass("template").addClass("buy")//修改类名
							.css({display:"inline-block"})//设置css样式
							.appendTo("#right")//添加到盒子中
							.children("a").children(".img").attr("src",prod.img)//修改图片
							.parent("a").next("._template1")
							.children(".desc").children("a").text(prod.desc)//描述
							.parent(".desc").next(".price")
							.children("a").find("i").text(prod.price1)
							.next("b").text(prod.price2)
							.parents(".price").next(".id").text(prod.id)//商品编号

			})
			
		}
	})
});
//滑动效果
$(function () {
	$("#right").on("mouseenter",".buy",function (e) {
		var index = $(this).children("._template1").children(".id").text()-13;
		$("._template1",$("#right")).eq(index).stop().animate({bottom:0},1000);
	})
	$("#right").on("mouseleave",".buy",function () {
		$("._template1",$("#right")).stop().animate({bottom:-30},1000)
	})
})
	
/******************************************************************/
//地标产品
/******************************************************************/	  		 
$(function () {
	//使用ajax访问后端，获取数据
	$.ajax({
		type:"get",
		url:"mock/dibiao.json",
		dataType:"json",
		success:function (responseData) {//处理响应程序
			responseData.res_body.list.forEach(function (prod) {
				$(".template:eq(0)",$("#right1")).clone()//克隆模板
							.removeClass("template").addClass("buy")//修改类名
							.css({display:"inline-block"})//设置css样式
							.appendTo("#right1")//添加到盒子中
							.children("a").children(".img").attr("src",prod.img)//修改图片
							.parent("a").next("._template2")
							.children(".desc").children("a").text(prod.desc)//描述
							.parent(".desc").next(".price")
							.children("a").find("i").text(prod.price1)
							.next("b").text(prod.price2)
							.parents(".price").next(".id").text(prod.id)//商品编号

			})
			
		}
	})
});
//滑动效果
$(function () {
	$("#right1").on("mouseenter",".buy",function () {
		var index = $(this).children("._template2").children(".id").text()-19;
		$("._template2",$("#right1")).eq(index).stop().animate({bottom:0},1000);
	})
	$("#right1").on("mouseleave",".buy",function () {
		$("._template2",$("#right1")).stop().animate({bottom:-30},1000)
	})
})
/******************************************************************/
//老字号
/******************************************************************/	  		 
$(function () {
	//使用ajax访问后端，获取数据
	$.ajax({
		type:"get",
		url:"mock/laozhihao.json",
		dataType:"json",
		success:function (responseData) {//处理响应程序
			responseData.res_body.list.forEach(function (prod) {
				$(".template:eq(0)",$("#right2")).clone()//克隆模板
							.removeClass("template").addClass("buy")//修改类名
							.css({display:"inline-block"})//设置css样式
							.appendTo("#right2")//添加到盒子中
							.children("a").children(".img").attr("src",prod.img)//修改图片
							.parent("a").next("._template3")
							.children(".desc").children("a").text(prod.desc)//描述
							.parent(".desc").next(".price")
							.children("a").find("i").text(prod.price1)
							.next("b").text(prod.price2)
							.parents(".price").next(".id").text(prod.id)//商品编号

			})
			
		}
	})
});
//滑动效果
$(function () {
	$("#right2").on("mouseenter",".buy",function () {
		var index = $(this).children("._template3").children(".id").text()-25;
		$("._template3",$("#right2")).eq(index).stop().animate({bottom:0},1000);
	})
	$("#right2").on("mouseleave",".buy",function () {
		$("._template3",$("#right2")).stop().animate({bottom:-30},1000)
	})
})
/******************************************************************/
//礼品礼盒
/******************************************************************/	  		 
$(function () {
	//使用ajax访问后端，获取数据
	$.ajax({
		type:"get",
		url:"mock/liping.json",
		dataType:"json",
		success:function (responseData) {//处理响应程序
			responseData.res_body.list.forEach(function (prod) {
				$(".template:eq(0)",$("#right3")).clone()//克隆模板
							.removeClass("template").addClass("buy")//修改类名
							.css({display:"inline-block"})//设置css样式
							.appendTo("#right3")//添加到盒子中
							.children("a").children(".img").attr("src",prod.img)//修改图片
							.parent("a").next("._template4")
							.children(".desc").children("a").text(prod.desc)//描述
							.parent(".desc").next(".price")
							.children("a").find("i").text(prod.price1)
							.next("b").text(prod.price2)
							.parents(".price").next(".id").text(prod.id)//商品编号

			})
			
		}
	})
});
//滑动效果
$(function () {
	$("#right3").on("mouseenter",".buy",function () {
		var index = $(this).children("._template4").children(".id").text()-31;
		$("._template4",$("#right3")).eq(index).stop().animate({bottom:0},1000);
	})
	$("#right3").on("mouseleave",".buy",function () {
		$("._template4",$("#right3")).stop().animate({bottom:-30},1000)
	})
})
/****************************************/
//搜索框键盘弹起事件
/*************************************/
$(function () {
	$(".left",$("#_search")).on("keyup", function(){
		let answer = $(this).val(),
			url = `https://suggest.taobao.com/sug?code=utf-8&q=${answer}&callback=?`;
		$.getJSON(url, function(data){
			var html = "";
			data.result.forEach(function(curr){
				html += `<div>${curr[0]}</div>`;
			});
			$(".suggest").html(html);
		});
	});
})
			