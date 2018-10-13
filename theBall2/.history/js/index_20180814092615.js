


var time=new Date();/*时间差*/
var background,
hp,/*给予血量*/
hp_box,/*总血量*/
fail_hp,/*当前血量*/
fractionNow,/*现有得分*/
fractionNeed,/*升级需要得分*/
speed,
delayed,
// ballShow,
interval,
negative,
numbox,

negative=0;
delayed=0;
degree=180;
interval=300;
// ballShow=$('.ball');

const idxW=1080;/*主界面宽高*/
const idxH=720;
const gameW=720;/*游戏宽高*/
const gameH=720;
const ballFour=['#f45646','#333','#efa97a','#6dd3ce'];/*小球颜色*/

let patternNow;/*当前模式*/
let numList=-180; 
let launchNum=2;/*默认发球为两个*/
let visited=false;/*是否进入过娱乐模式*/
let ballShow=$('.ball');


const start=document.querySelectorAll('.start');


window.onload=function(){
    $('.ball').addClass("ballZhuan");
    $(".introTxtBtn").mouseover(function(){$('.introTxt').stop().fadeIn(400);})
	$(".introTxtBtn").mouseout(function(){$('.introTxt').stop().fadeOut(400);})
    choose();
}

//进入对应模式
function choose(){
	for(let i=0;i<start.length;i++){
        start[i].onclick = function(){
            $('.idx_pattern').fadeOut(300);
            $('.introTxtBtn').fadeOut(300);
            patternNow=i;/*存储模式*/
            initInfo(patternNow);
            setTimeout(function(){
        		appendball(patternNow);
        	},1200)
        }
	}
}

function initInfo(patternNow){
    boxChange(gameW,gameH,500);
    hp=1;
    hp_box=10;
    fail_hp=hp*100/hp_box;
    fractionNow=8;
    if(!patternNow){fractionNeed=10;}
    else{fractionNeed="∞";}
    speed=800;

    /*颠倒模式互换颜色*/
	// if(patternNow==1){
	// 	$('.redPart').css('background','#333');
	// 	$('.blackPart').css('background','#f45646');
    // }
    
	// if(patternNow==2){
	// 	speed=1400;
	//     numList=-360;
	//     launchNum=4;
	//     degree=-90;
	// 	delayed=1100;
    // }
    
	// if(patternNow==2&&visited==true){
	// 	ballShow.rotate({
    //         animateTo:numList,
    //         duration:450,
    //     });
	// }
    $('.fraction_left').html(fractionNow);
    $('.fraction_right').html(fractionNeed);
    $('.hp_div_main').animate({width:fail_hp+"%"});

    $('.game_fraction').fadeIn(500);

    /*小球位置及角度就绪*/
    $('.ball').animate({top:'210px'},500,function(){
        $(this).removeClass("ballZhuan");
        if(patternNow!=2){
            $(this).rotate({animateTo:-180,duration:600});/*这一步尤为重要，得分是在-180°上去迭代完成的，角度不转会不衔接*/
        }
        // else if(patternNow==2){
        //     if(visited){
        //         appendball();
        //         rotate_transition(".ball",".ball2");
        //     }else{
        //         $('.game_mask').fadeIn(300);
        //         rotate_transition(".ball",".ball2");
        //     }
        // }
    })
}

/*关卡设置*/
// function levelUp(patternNow){
// 	if(patternNow==0 || patternNow==2){
// 		if(fractionNow%10==0){
// 	        callarrow("速度加快");
// 			speed-=100;
// 	        delayed=1100;
// 		}
// 	}
// 	if(patternNow==1){
// 		if(fractionNow==10){
// 	        callarrow("速度加快");
// 	        speed-=200;
// 	        fractionNeed=30;
// 	        delayed=1100;
// 		}
// 	    if(fractionNow==30){
// 	        callarrow("lalala");
// 	        speed-=100;
// 	        fractionNeed=50;
// 	        delayed=1100;
// 	    }
// 	}
// }

function appendball(patternNow){  //生成小球
    // if(patternNow==2){
	//     ballShow=$('.ball2');
	//     return;
    // }
    if(hp<=0){
        $('.over').animate({opacity:1},600,function(){
            $('.button_box').css('display','block');
            $('.button_box').animate({opacity:1},800)});
        return;
    }
	if(patternNow==1&&fractionNow==50){
        $('.success').animate({opacity:1},600,function(){
	            $('.button_box').css('display','block')
	            $('.button_box').animate({opacity:1},800)
	        });
	    return;
    }
    
    
	// levelUp(patternNow);
    // $('.fraction_right').html(fractionNeed);
    /*需要两个控制随机，否则发球颜色和发射器顺序会固定*/
    let chooseColor=parseInt(Math.random()*launchNum);/*随机选择颜色*/
    let chooseBox=parseInt(Math.random()*launchNum);/*随机放到各发射器中*/

    $('<div class="launchBall" style="background:'+ballFour[chooseColor]+';"></div>').appendTo($('.launcher')[chooseBox]);
    var launchBall=$('.launchBall');
    setTimeout(function(){ballmove(launchBall,chooseBox,patternNow)},delayed);
}

/*小球运动*/
function ballmove(launchBall,box_num,patternNow){
    let range;
    let direction;
    delayed=0;
    // box_num < 2 ? (box_num==0 ? range=350 : range=-350) : (box_num==2 ? range=350 : range=-350);
    box_num==0||box_num==2 ? range=350 : range=-350;
    box_num < 2 ? direction='top' : direction='left';
    launchBall.animate(
        {[direction]:""+range+"px"},
        {
            duration:speed,
            easing:'linear',    // easing:'linear' 匀速直线运动
            progress:function(){
                var this_height=Math.floor($(this).offset().top)+$(this).height();
                var this_width=Math.floor($(this).offset().left)+$(this).width();
                var box_top=ballShow.offset().top;
                var box_left=ballShow.offset().left;
                var box_height=ballShow.offset().top+ballShow.height();
                var box_width=ballShow.offset().left+ballShow.width();					

                if(launchNum == 2){ //两个方向
                    if(box_num < 2){  //上下
                        if(range==350){  //向下
                            if(this_height>=box_top+2){
                                movejudge(this,-270,-0,-90,-180,4,patternNow);
                            }
                        }else if(range==-350){  //向上
                            if($(this).offset().top<=box_height){
                                movejudge(this,-90,-180,-270,-0,4,patternNow);
                            }
                        }
                     }
                }
                // else if(launchNum==4){ //四个方向
                //     if(box_num < 2){  //上下
                //         if(range==350){  //向下
                //             if(this_height>=box_top+2){
                //                  movejudge(this,-270,-0,-90,-180,5,patternNow);
                //             }
                //         }else if(range==-350){  //向上
                //             if($(this).offset().top<=box_height+170){
                //                  movejudge(this,-90,-180,-270,-0,5,patternNow);
                //             }
                //         }
                //     }else if(box_num >= 2){   //左右
                //         if(range==350){    //向右
                //             if(this_width>=box_left+2){
                //                 movejudge(this,-0,-90,-180,-270,5,patternNow);
                //             }
                //         }else if(range==-350){  //向左
                //             if(this_width <= box_width+218){
                //                  movejudge(this,-180,-270,-0,-90,5,patternNow);
                //             }
                //         }
                //     }
                // }
            }
        }
    )
}


document.addEventListener('keydown',ballPlay,false);
function ballPlay(){
    if(launchNum==2&&event.keyCode==32){  //只有两种颜色
        if(new Date()-time>interval){
            numList+=degree;
            ballShow.rotate({
                animateTo: numList,
                duration:450,
            });
            time=new Date();
        }
    }
    // else if(launchNum==4){  //四钟颜色
    //     if(event.keyCode==32 && visited==false){   //遮罩按空格
    //         visited=true;
    //         $('.game_mask').fadeOut(300);
	//       	appendball();
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
    //         ballShow.rotate({
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
    //         ballShow.rotate({
    //                 animateTo: numList,
    //                 duration:340,
    //         });
    //     }
  	// }
}

/*再玩一次&&返回主界面*/
const buttonLeft=document.querySelector('.button_left');
const buttonRight=document.querySelector('.button_right');
buttonLeft.addEventListener('click',playAgain,false)
buttonRight.addEventListener('click',backIdx,false)
function playAgain(){
    $('.over,.success,.button_box').animate({opacity:0},200);
    $('.button_box').css('display','none');

    initInfo(patternNow);
    setTimeout(function(){
        appendball(patternNow);
    },1200)
}
function backIdx(){
    boxChange(idxH,idxW,500);
	degree=-180;
	negative=0;
	speed=1200;
    numList=0;
	delayed=0;
	launchNum=2;
	$('.blackPart').css('background','#333');
	$('.redPart').css('background','#f45646');
    rotate_transition(".ball2",".ball");
	ballShow=$('.ball');
	
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