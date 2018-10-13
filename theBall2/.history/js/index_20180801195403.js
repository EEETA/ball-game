


var time=new Date();/*时间差*/
var numList,
background,
num,
box_num,
hp,/*当前血量*/
hp_box,/*总血量*/
fail_hp,/*当前血量*/
fractionNow,/*得分*/
fractionNeed,/*升级需要得分*/
speed,
delayed,
num_number,
box_num_number,
direction,
box,
interval,
this_ball,
switch_1,

visited,/*进入过娱乐模式后，不再弹出操作提示框*/
negative,
numbox,

switch_1=0;
visited=false;
numList=0;
negative=0;
delayed=0;
degree=-180;
interval=300;
num_number=2;
box_num_number=2;

box=$('.ball');

const idxW=1080;/*主界面宽高*/
const idxH=720;
const gameW=720;/*游戏宽高*/
const gameH=720;

const start=document.querySelectorAll('.start');
let again;/*再来一次时用来判断模式*/

window.onload=function(){
    $('.ball').addClass("ballZhuan");
    $(".introTxtBtn").mouseover(function(){ $('.introTxt').stop().fadeIn(400);})
	$(".introTxtBtn").mouseout(function(){ $('.introTxt').stop().fadeOut(400);})
    choose();
}

function choose(){//进入对应模式
	for(let i=0;i<start.length;i++){
        start[i].onclick=function(){
            $('.idx_pattern').fadeOut(300);
            $('.introTxtBtn').fadeOut(300);
            again=i;
            initInfo(i);
            setTimeout(function(){
        		appendball(i);
        	},1200)
        }
	}
}

function initInfo(numberMode){
    hp=1;
    hp_box=10;
    fail_hp=hp*100/hp_box;
    fractionNow=8;
    if(!numberMode){fractionNeed=10;}
    else{fractionNeed="∞";}
    speed=800;

    /*颠倒模式互换颜色*/
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
	if(numberMode==2&&visited==true){
		box.rotate({
            animateTo:numList,
            duration:450,
        });
	}
    $('.fraction_left').html(fractionNow);
    $('.fraction_right').html(fractionNeed);
    $('.hp_div_main').animate({width:fail_hp+"%"});

    box_animation(gameW,gameH,500);
    $('.game_fraction').fadeIn(500);

    /*小球位置及角度就绪*/
    $('.ball').animate({top:'210px'},500,function(){
        // $(this).removeClass("ballZhuan");
        if(numberMode!=2){
            $(this).rotate({animateTo:-180,duration:600});/*这一步尤为重要，得分是在-180°上去迭代完成的，角度不转会十分生硬*/
            numList=-180;
        }
        else if(numberMode==2){
            if(visited){
                appendball('.div_middle');
                rotate_transition(".ball",".ball2");
            }else{
                Mask();
                rotate_transition(".ball",".ball2");
            }
        }
    })
}

/*关卡设置*/
function levelUp(numberMode){
	if(numberMode==0 || numberMode==2){
		if(fractionNow%10==0){
	        callarrow("速度加快");
			speed-=100;
	        delayed=1100;
		}
	}
	if(numberMode==1){
		if(fractionNow==10){
	        callarrow("速度加快");
	        speed-=200;
	        fractionNeed=30;
	        delayed=1100;
		}
	    if(fractionNow==30){
	        callarrow("lalala");
	        speed-=100;
	        fractionNeed=50;
	        delayed=1100;
	    }
	}
}

function appendball(numberMode){  //生成小球
    if(hp<=0){
        $('.over').animate({opacity:1},600,function(){
            $('.button_box').css('display','block');
            $('.button_box').animate({opacity:1},800)});
        return;
    }
	if(numberMode==1&&fractionNow==50){
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
    // $('.fraction_right').html(fractionNeed);
    
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
                }
                else if(box_num_number==4){ //四个方向
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



document.addEventListener('keydown',ballPlay,false);
function ballPlay(){
    if(box_num_number==2&&event.keyCode==32){  //只有两种颜色
        if(new Date()-time>interval){
            numList+=degree;
            box.rotate({
                animateTo: numList,
                duration:450,
            });
            time=new Date();
        }
    }
    else if(box_num_number==4){  //四钟颜色
        if(event.keyCode==32 && visited==false){   //遮罩按空格
            switch_1=1;
            $('.game_mask').fadeOut(500);
            $('.Mask_p').fadeOut(200);
            $('.Mask_span').fadeOut(500);
            visited=true;
	      	appendball('.div_middle');
        }
        if(event.keyCode==65){   //左
            numList+=degree;
            negative=numList;
            if(numList>0){   //度数往右转 度数变为正数时
                if(numList%360==90 || numList%360==270){
                    negative=-numList-180;
                }
                if(numList%360==0 || numList%360==180){
                    negative=-negative
                }
            }
            box.rotate({
                    animateTo: numList,
                    duration:340,
            });
        }
        if(event.keyCode==68){  //右
            numList-=degree;
            if(numList<0) negative+=degree;
            if(numList>0) {
                if(numList%360==0 || numList%360==180){
                    negative=-numList;
                }
                if(numList%360==90 || numList%360==270){
                    negative=-numList-180;
                }
            };
            box.rotate({
                    animateTo: numList,
                    duration:340,
            });
        }
  	}
}

/*再玩一次&&返回主界面*/
const buttonLeft=document.querySelector('.button_left');
const buttonRight=document.querySelector('.button_right');
buttonLeft.addEventListener('click',playAgain,false)
buttonRight.addEventListener('click',backIdx,false)
function playAgain(){
    $('.over,.success,.button_box').animate({opacity:0},200);
    $('.button_box').css('display','none');

    initInfo(again);
    setTimeout(function(){
        appendball(again);
    },1200)
}
function backIdx(){
    box_animation(idxH,idxW,500);
	degree=-180;
	negative=0;
	speed=1200;
    numList=0;
	delayed=0;
	num_number=2;
	box_num_number=2;
	$('.blackPart').css('background','#333');
	$('.redPart').css('background','#f45646');
    rotate_transition(".ball2",".ball");
	box=$('.ball');
	
   	$('.game_fraction').fadeOut(300);
    $('.button_box').css('display','none');
    $('.over,.success').animate({opacity:0},100);
    $('.ball').animate({top:'0px'},500,function(){
        $(this).addClass("ballZhuan");
	})
	setTimeout(function(){
		$('.introTxtBtn').fadeIn(300);
		$('.idx_pattern').fadeIn(300);
   	},800)
}