/**

 * @date  2017-10-01 20:37:27
 * @name  Elderly
 */
var time=new Date();
var time2=new Date();
var numList,
background,
num,
box_num,
fraction,//当前得分
hp,
// _hp,
speed,
toplimit,
delayed,
num_number,
box_num_number,
direction,
box,
interval,
this_ball,
switch_1,
switch_2,
switch_3,
negative,
numbox,
hp_box,
fail_hp,
ttSet;

switch_1=0;
switch_2=0;
switch_3=0;
numList=0;
negative=0;
delayed=0;
speed=1200;
degree=-180;
interval=300;
num_number=2;
box_num_number=2;
ttSet=300;
box=$('.ball');

const idxW=1080;/*主界面宽高*/
const idxH=720;
const gameW=720;/*游戏宽高*/
const gameH=720;

const start=document.querySelectorAll('.start');
var again;

window.onload=function(){
    $('.ball').addClass("ballZhuan");
    $(".introTxtBtn").mouseover(function(){ $('.introTxt').stop().fadeIn(400);})
	$(".introTxtBtn").mouseout(function(){ $('.introTxt').stop().fadeOut(400);})
    choose();
}

function choose(){//进入对应模式
	for(var i=0;i<start.length;i++){
		(function(a){
			start[a].onclick=function(){
				$('.idx_pattern').fadeOut(300);
                $('.introTxtBtn').fadeOut(300);
                produceFn(a);
				again=a;
			}
		})(i)
	}
}

function produceFn(numberMode){
	hp=1;
    hp_box=10;
    fraction=8;
    numList=0;
	fail_hp=hp*100/hp_box;
	if(numberMode==0){
		toplimit=10;
	}else{
		toplimit="∞";
    }
	if(numberMode==1){
		$('.redPart').css('background','#333');
		$('.blackPart').css('background','#f45646');
	}
	if(numberMode==2){
		speed=1400;
	    numList=-360;
	    num_number=4;
	    box_num_number=4;
	    degree=-90;
		delayed=1100;
	}
	if(again==2&&switch_2==1){
		box.rotate({
            animateTo:numList-180,
            duration:450,
        });
	}
    $('.fraction_left').html(fraction);
    $('.fraction_right').html(toplimit);
    $('.hp_div_main').animate({width:fail_hp+"%"},500);

	setTimeout(function(){
		box_animation(gameW,gameH,500);
   		$('.game_fraction').fadeIn(500);
     	$('.ball').animate({top:'210px'},500,function(){
            $(this).removeClass("ballZhuan");
            if(numberMode!=2){
            	$(this).rotate({animateTo:-180,duration:600});
            	numList=-180;
            }else if(numberMode==2&&switch_2==0){
            	if(switch_3){
        			rotate_transition(".ball",".ball2");
            		appendball('.div_middle');
            		switch_2=1;
            	}else{
                    Mask();
                    rotate_transition(".ball",".ball2");
            	}
            }
        	setTimeout(function(){
        		appendball(numberMode);
        	},600)
    	})
	},ttSet)
}

/*关卡设置*/
function levelUp(numberMode){
	if(numberMode==0 || numberMode==2){
		if(fraction%10==0){
	        callarrow("速度加快");
			speed-=100;
	        delayed=1100;
		}
	}
	if(numberMode==1){
		if(fraction==10){
	        callarrow("速度加快");
	        speed-=200;
	        toplimit=30;
	        delayed=1100;
		}
	    if(fraction==30){
	        callarrow("lalala");
	        speed-=100;
	        toplimit=50;
	        delayed=1100;
	    }
	}
}

function appendball(numberMode){  //生成小球
    if(hp<=0){
        $('.over').animate({opacity:1},600,function(){
            $('.button_box').css('display','block');
            $('.button_box').animate({opacity:1},800,function(){
                switch_3=1;
            })});
        return;
    }
	if(numberMode==1&&fraction==50){
        $('.success').animate({opacity:1},600,function(){
	            $('.button_box').css('display','block')
	            $('.button_box').animate({opacity:1},800)
	        });
	    return;
   }
    if(numberMode==2){
	    box=$('.ball2');
	    return;
    }
    
	levelUp(numberMode);
    $('.fraction_right').html(toplimit);
    
    ballFour=new Array();
    ballFour[0]="#f45646";
    ballFour[1]="#333";
    ballFour[2]="#efa97a";
    ballFour[3]="#6dd3ce";
    
    num=parseInt(Math.random()*num_number);
    box_num=parseInt(Math.random()*box_num_number);
    $('<div class="div_ball" style="background:'+ballFour[num]+';z-index:10"></div>').appendTo($('.div_middle')[box_num]);
    this_ball=$('.div_ball');
    setTimeout(function(){ballmove(this_ball,box_num,numberMode)},delayed);
}

/*小球运动*/
function ballmove(this_ball,box_num,numberMode){
    delayed=0;
    box_num < 2 ? (box_num==0 ? range=350 : range=-350) : (box_num==2 ? range=350 : range=-350);
    box_num < 2 ? direction='top' : direction='left';
    this_ball.animate(
        {[direction]:""+range+"px"},
        {duration:speed,
         easing:'linear',    // easing:'linear' 匀速直线运动
            progress:function(){
                var this_height=Math.floor($(this).offset().top)+$(this).height();
                var this_width=Math.floor($(this).offset().left)+$(this).width();
                var box_top=box.offset().top;
                var box_left=box.offset().left;
                var box_height=box.offset().top+box.height();
                var box_width=box.offset().left+box.width();					

                if(box_num_number == 2){ //两个方向
                    if(box_num < 2){  //上下
                        if(range==350){  //向下
                            if(this_height>=box_top+2){
                                movejudge(this,-270,-0,-90,-180,4,numberMode);
                            }
                        }else if(range==-350){  //向上
                            if($(this).offset().top<=box_height){
                                movejudge(this,-90,-180,-270,-0,4,numberMode);
                            }
                        }
                     }
                }else if(box_num_number==4){ //四个方向
                    if(box_num < 2){  //上下
                        if(range==350){  //向下
                            if(this_height>=box_top+2){
                                 movejudge(this,-270,-0,-90,-180,5,numberMode);
                            }
                        }else if(range==-350){  //向上
                            if($(this).offset().top<=box_height+170){
                                 movejudge(this,-90,-180,-270,-0,5,numberMode);
                            }
                        }
                    } else if(box_num >= 2){   //左右
                        if(range==350){    //向右
                            if(this_width>=box_left+2){
                                movejudge(this,-0,-90,-180,-270,5,numberMode);
                            }
                        }else if(range==-350){  //向左
                            if(this_width <= box_width+218){
                                 movejudge(this,-180,-270,-0,-90,5,numberMode);
                            }
                        }
                    }
                }
            }
        }
    )
}


/*再来一遍&&返回大厅*/
$('.button_left').click(function(haha,gameInit){
    $('.over,.success,.button_box').animate({opacity:0},200);
    $('.button_box').css('display','none');

	speed=1200;
    ttSet=0;
    if(again==2){
	    produceFn('.div_middle');
    }else{
		produceFn(again);	
    }
});



$('.button_right').click(function(){
	box_animation(idxH,idxW,500);
	degree=-180;
	negative=0;
	speed=1200;
    numList=0;
	delayed=0;
	interval=300;
	num_number=2;
	box_num_number=2;
	$('.blackPart').css('background','#333');
	$('.redPart').css('background','#f45646');
    rotate_transition(".ball2",".ball");
	box=$('.ball');
	switch_2=0;
	if(again!=2){
		switch_3=0;
	}else{
		switch_3=1;
	}
	
	/*正常模式返回初始化*/
   	$('.game_fraction').fadeOut(300);
   	$('.button_box').fadeOut(300);
    $('.over').animate({opacity:0},100);
    $('.success').animate({opacity:0},100);
    $('.ball').animate({top:'0px'}, 500,function(){
        $(this).addClass("ballZhuan");
	})
	setTimeout(function(){
		$('.introTxtBtn').fadeIn(300);
		$('.idx_pattern').fadeIn(300);
   	},800)
})


document.addEventListener('keydown',function(){   //按键旋转函数
    if(box_num_number==2&&event.keyCode==32){  //只有两种颜色
        if(new Date() - time > interval){
            numList+=degree;
            box.rotate({
                animateTo: numList,
                duration:450,
            });
            time=new Date();
        }
    }
    // else if(box_num_number==4){  //四钟颜色
    //     if(event.keyCode==32 && switch_2==0 && switch_3==0){   //遮罩按空格
    //         switch_1=1;
    //         $('.game_mask').fadeOut(500);
    //         $('.Mask_p').fadeOut(200);
    //         $('.Mask_span').fadeOut(500);

	//       	appendball('.div_middle');
	//       	switch_2=1;
    //     }
    //     if(event.keyCode==65){   //左
    //         numList+=degree;
    //         negative=numList;
    //         if(numList>0){   //度数往右转 度数变为正数时
    //             if(numList%360==90 || numList%360==270){
    //                 negative=-numList-180;
    //             }
    //             if(numList%360==0 || numList%360==180){
    //                 negative=-negative
    //             }
    //         }
    //         box.rotate({
    //                 animateTo: numList,
    //                 duration:340,
    //         });
    //     }
    //     if(event.keyCode==68){  //右
    //         numList-=degree;
    //         if(numList<0) negative+=degree;
    //         if(numList>0) {
    //             if(numList%360==0 || numList%360==180){
    //                 negative=-numList;
    //             }
    //             if(numList%360==90 || numList%360==270){
    //                 negative=-numList-180;
    //             }
    //         };
    //         box.rotate({
    //                 animateTo: numList,
    //                 duration:340,
    //         });
    //     }
  	// }
})

