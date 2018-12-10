// JavaScript Document
var button = document.getElementById("button");/*全局button变量*/
var background = document.getElementById("background");/*全局background变量*/
var backtime = 0;
var score=0;
var clearIner=[];//存储所有动画的名称

	window.onload = function(){	
		button.onclick=clickbutton;		
	}

	function clickbutton(){
		   button.style.display = "none";//隐藏开始按钮
			background.style.backgroundImage = "url(./images/background_1.png)";
			clearIner.push(setInterval(backgroundmove,200));//设置定时函数移动背景图片
			plane();/*飞机*/
			bullet();/*子弹*/
			clearIner.push(setInterval(ememyPlane,400));//敌机生成
			clearIner.push(setInterval(bullet,80));//子弹发射
			
			//检测敌机和子弹是否碰撞
			clearIner.push(setInterval(miss,10));
			
			
		    //点击退出按钮  刷新页面
			document.getElementById("exit").onclick = function(){
			  location.reload() 
			}
			
			//点击重来按钮重新开始游戏
			document.getElementById("replace").onclick = function(){
			var info=document.getElementById("div").innerHTML;
			background.innerHTML=info;
			
			
			//将全局变量还原
			backtime = 0;
			score = 0;
			clearIner = [];
			
			
			//直接调用按钮的点击事件
			clickbutton();
			}
	}
	
	
	function backgroundmove(){/*背景图移动*/
		backtime = backtime+20;//移动速度的调整
		background.style.backgroundPosition = "0px "+ backtime+ "px";//用定位来实现图片的移动
	}
	
	/*创建飞机*/
	function plane(){
		var img = document.createElement("img");
		img.src = "images/myplane.gif";
		img.style.position = "absolute";
		img.style.zIndex = 998;
		img.style.width = "66px";
		img.style.height = "80px";
		img.style.top = "450px";
		img.style.left = "120px";
		img.id = "plane";//方便查找飞机
		img.life = 3;//飞机的生命
		background.appendChild(img);
		
		//当鼠标移入飞机区域内，鼠标在背景图上移动，添加监控
		background.onmouseover = function(){
			
			background.onmousemove = function(event){
				var event = event||window.event;
				
				//获取当前鼠标的位置
				var x = event.clientX;
				var y = event.clientY;
				
				//获取当前元素的位置
				var left = this.offsetLeft;
				var top = this.offsetTop;
				
				//获取鼠标在背景图中的位置
				left = x - left;
				top = y - top;
				
				//飞机实际移动的尺寸
				left = left - img.offsetWidth/2;
				top = top - img.offsetHeight/2;
				
				if(left <= 0){
					left = 0;	
				}
				if(top <= 0){
					top = 0;	
				}
				if(left >= background.offsetWidth - img.offsetWidth){
					left = background.offsetWidth - img.offsetWidth;	
				}
				if(top >= background.offsetHeight - img.offsetHeight){
					top = background.offsetHeight - img.offsetHeight;
				}
				
				img.style.left = left+"px";
				img.style.top = top+"px";
					
			}
		}
		
		img.onmouseout = function(){
			background.onmousemove = null;
		}
	}
	
	/*创建子弹*/		
	function bullet(){
		var plane = document.getElementById("plane");//查找飞机节点
		
		//获取飞机位置
		var left=plane.offsetLeft;//获取飞机距离左侧的距离
		var top=plane.offsetTop;//获取飞机距离顶部的距离
		var width=plane.offsetWidth;
				
		var bul = document.createElement("img");
		bul.src = "images/bullet.png";
		bul.style.position = "absolute";
		bul.style.width = "6px";
		bul.style.height = "14px";
		bul.name = "bullet";//查找子弹
		background.appendChild(bul);
		
		left = left + width/2 - bul.offsetWidth/2;;
		top = top - bul.offsetHeight;
		bul.style.top = top + "px";//子弹的距离顶部的位置即为飞机距离顶部的位置减去子弹自身的长度
		bul.style.left = left + "px";//子弹的距离左侧的位置即为飞机距离左侧的位置加上飞机一般的距离
		
		//子弹移动
		var timer = null;
		timer = setInterval(bullmove,20);
		function bullmove(){
			if( top <= 0 ){
				bul.remove();
				clearInterval(timer);	
			}else{
				top=top-10;
				bul.style.top=top+"px";	
			}
		}
		clearIner.push(timer);
	
	}
	
	function ememyPlane(){
		//随机生成数字1,2,3
		var num = Math.floor(Math.random()*3)+1;
			
		var img = document.createElement("img");
		var speed = 0;
		if(num == 1){
				img.src = "images/enemy_plane_1.png";
				img.style.left = Math.floor(Math.random()*(320-34)) + "px";
				img.style.width = "34px";
				img.style.height = "24px;"
				img.style.top = "-24px";
				img.life = 3;
				img.score = 50;
				speed = 15;
				var p = -24;
					
				
			}else if(num == 2){
				img.src = "images/enemy_plane_2.png";
				img.style.left = Math.floor(Math.random()*(320-46)) + "px";
				img.style.width = "46px";
				img.style.height = "60px;"
				img.style.top = "-60px";
				img.life = 10;
				img.score = 100;
				speed = 5;
				var p = -60;
			
				
			}else if(num == 3){
				img.src="images/enemy_plane_3.png";
				img.style.left = Math.floor(Math.random()*(320-110)) + "px";
				img.style.width = "110px";
				img.style.height = "164px";
				img.style.top = "-164px";
				img.life = 10;
				img.score = 200;
				speed = 5;
				var p = -164;
				}

	
			//生成敌机
			time = setInterval(dplanemove,100);
				function dplanemove(){
					p = p + speed;
					img.style.top = p + "px";	
					if(img.offsetTop > 568){
						img.remove();	
					}
				}
				
			clearIner.push(time);				
			img.name = "ememy";	
			img.style.position = "absolute";
			background.appendChild(img);
	
		}
			
	//检测是否碰撞	
	function miss(){
				
		//选中所有的子弹和所有的战机
		var bullets = document.getElementsByName("bullet");
		var ememy =document.getElementsByName("ememy");
		var plane = document.getElementById("plane");
				
		for(var i = 0;i<ememy.length;i++){
					
			//获取敌机的距离左侧的距离，和敌机本身的大小
			var left = ememy[i].offsetLeft;
			var top = ememy[i].offsetTop;
			var width = ememy[i].offsetWidth;
			var height = ememy[i].offsetHeight;
					
			for(var j = 0;j < bullets.length; j++){
						 
				var bleft = bullets[j].offsetLeft;
				var btop = bullets[j].offsetTop;
				var bwidth = bullets[j].offsetWidth;
				var bheight = bullets[j].offsetHeight;
						
				//横轴的最大值和最小值
				var leftmax = left+width;
				var leftmin = left-bwidth;
						
				//纵轴的最大值和最小值
						
				var topmax = top+height;
				var topmin = top-bheight;
						
				if((bleft >= leftmin && bleft <= leftmax) &&(btop >= topmin &&btop <= topmax)){
								
					//敌机生命力减1
					ememy[i].life = ememy[i].life-1;
					if(ememy[i].life == 0){						
						score = ememy[i].score+score;
						document.getElementById("scoreinfo").innerHTML=score;
						ememy[i].remove();	
					}
					//子弹消失
					bullets[j].remove();
					}
				}
						
						
						
		//确定飞机和敌机碰撞的范围
		var pleft = plane.offsetLeft;
		var ptop = plane.offsetTop;
		var pwidth = plane.offsetWidth;
		var pheight = plane.offsetHeight;
						
		//飞机的left和飞机的top的最大值和最小值
		var pleftmin = left - pwidth;
		var pleftmax = left + width;
						
		var ptopmin = top - pheight;
		var ptopmax = top + height;
						
		if(pleft >= pleftmin && pleft <= pleftmax && (ptop >= ptopmin && ptop <= ptopmax)){
							
			//战机生命力调整
			plane.life = plane.life-1;
			if(plane.life == 0){
								
				//区别几号飞机
				switch(ememy[i].score){
					case 100:
							ememy[i].src = "./images/boom_plane_1.gif";
							break;	
									
					case 200:
							ememy[i].src = "./images/boom_plane_2.gif";
							break;
									
					case 300:
							ememy[i].src = "./images/boom_plane_3.gif";
							break;
				}
							
			//改变战机图片
			plane.src = "./images/boom_plane.gif";
			
			//清除所有动画
			for(var z = 0;z < clearIner.length; z++){
			clearInterval(clearIner[z]);	
			}
							
			//将飞机跟随鼠时间去除
			background.onmouseover = null;
			plane.onmouseout = null;
			background.onmousemove = null;
							
								
			document.getElementById("center").style.display = "block";
			document.getElementById("centerscore").innerHTML = score;
			}else{
				ememy[i].remove();	
			}
						
							
		}
        }
				
				
	}
			
			
			
		
				
				
			