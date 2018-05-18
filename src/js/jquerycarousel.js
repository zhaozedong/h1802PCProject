(function ($) {
	//构造函数
	function Carousel({imgs,height,width,duration,addPrevNextBtn}) {
		this.imgs=imgs;
		this.height=height;
		this.width=width;
		this.duration = duration || 3000; // 轮播切换时间
		this.addPrevNextBtn = addPrevNextBtn; // 是否添加向前/后翻页按钮

		this.container=null;//放置轮播图盒子的容器
		this.lis=null;//所有待播放li盒子
		this.len=imgs.length;//图片张数
		this.currindex=0;//当前播放图片的索引
		this.nextindex=1;//即将播放图片的索引
		this.prev=null;//向前翻得盒子
		this.next=null;//向后翻得盒子
		this.timer=null;//计时器的id
	};
	//向carousel的prototype添加属性
	$.extend(Carousel.prototype,{
		//布局 创建dom元素
		createDom:function(container){
			//保存当前播放图片放置的容器
			this.container=$(container);
			//添加类名为容器
			this.container.addClass("xm-container");
			//布局li标签
			var lis="",
				circles="";
				for (var i=0,len=this.imgs.length;i <len; i++) {
					lis+=`<li ${i==0 ? 'style="display:block;"':''}>
						<a href="${this.imgs[i].href}">
						<img src="${this.imgs[i].src}">
						</a>

					</li>`
					circles+=`<i ${i==0 ? 'class="current"':''}></i>`
				}
			// 向前/后翻页DOM结构
			var prevNext = "";
			if (this.addPrevNextBtn) {
				prevNext = `<div class="prev">&lt;</div>
							<div class="next">&gt;</div>`;
			}

			//完整布局
			var html=`
			<ul class="imgs">${lis}</ul>
			<div class="pages">${circles}</div>
			${prevNext}`;

			//添加到容器中
			this.container.html(html);
			//设置css属性
			this.container.css({
				width:this.width,
				height:this.height
			})
			$(".pages",this.container).css("width",this.width)
			$(".imgs, li",this.container).css({
				width:this.width,
				height:this.height
			})
			//保存lis的属性
			this.lis=$("li",this.container);
			this.circles=$("i",this.container);
			this.prev=$(".prev",this.container);
			this.next=$(".next",this.container)
			// 注册事件监听
			this.registerEventListener();
		},
		autoPlay:function(){
			this.timer=setInterval($.proxy(this.move,this),3000)
		},
		//轮播切换图片
		move:function () {
			//当前图片淡出
			this.lis.eq(this.currindex).stop().fadeOut();
			//即将播放图片淡入
			this.lis.eq(this.nextindex).stop().fadeIn();
			//修改小圆点索引
			this.circles.eq(this.currindex).removeClass("current")
			this.circles.eq(this.nextindex).addClass("current")
			//修改图片索引
			this.currindex=this.nextindex;
			this.nextindex++;
			if(this.nextindex==this.len)
				this.nextindex=0;
		},
		//注册事件监听
		registerEventListener:function(){
			//鼠标移入移出容器  停止或重启计时器
			this.container.hover($.proxy(this.stopPlay,this),$.proxy(this.move,this))
			//鼠标移入小圆点相对应图片切换
			this.circles.mouseover($.proxy(this.over,this))
			//点击向前 向后翻
			this.prev.on("click",$.proxy(this.previous,this))
			this.next.on("click",$.proxy(this.move,this))
		},
		//停止自动轮播
		stopPlay:function(){
			clearInterval(this.timer);
		},
		//鼠标移出移入
		over:function(e){
			var _index=$(e.target).index();
			if(this.currindex==_index)
				return;
			this.nextindex=_index;
			this.move();
		},
		//向前翻
		previous:function(){
			this.nextindex=this.currindex-1;
			if(this.nextindex<0)
				this.nextindex=this.len-1;
			this.move();
		}


	});
		// 插件
		// 向 jQuery.prototype 中扩展添加 carousel 方法
		$.fn.carousel = function(options){
			this.each(function(index, element){
				var c = new Carousel(options);
				c.createDom(element);
				c.autoPlay();
			});
		}
			
})(jQuery)


