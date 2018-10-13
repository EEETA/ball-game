

// 抖动效果
// jQuery.fn.shake = function (intShakes /*Amount of shakes*/, intDistance /*Shake distance*/, intDuration /*Time duration*/) {
//     this.each(function () {
//         var jqNode = $(this);
//         jqNode.css({ position: 'relative' });
//         for (var x = 1; x <= intShakes; x++) {
//             jqNode.animate({ left: (intDistance * -1) }, (((intDuration / intShakes) / 4)))
//             .animate({ left: intDistance }, ((intDuration / intShakes) / 2))
//             .animate({ left: 0 }, (((intDuration / intShakes) / 4)));
//         }
//     });
//     return this;
// }



// callarrow=function(arrow_html){  //初始化提升动画
//     for(var i=0;i<10;i++){
//         var a=new addarrow(i);
//         a.move();
//     }

//     $('.arrow').append('<span>'+arrow_html+'</span>');
//     $('.arrow span').animate({top:'0',opacity:1},600,function(){$(this).animate({opacity:0},800,function(){this.remove()})});

// }

//  addarrow=function(i){  //难度提升动画
//         var leftnum=parseInt(Math.random()*500);
//         var topnum=parseInt(Math.random()*400);
//         var arrow=$(' <img src="img/Arrow.png" class="img">');
//         var now=(Math.random()*1.1+0.75).toFixed(2);

//         $('.arrow').append(arrow);
//         $('.img')[i].style.cssText="top:"+topnum+"px;left:"+leftnum+"px;transform:scale("+now+","+now+")";

//         this.move=function(i){
//             $('.img').animate({top:'-100',opacity:'0'},700,function(){
//                 this.remove();
//             });
//         }
// }
// endarrow=function(innertHTML,time){
//     $('.arrow').append('<span>'+innertHTML+'</span>');
//     setTimeout(function(){$('.arrow span').animate({top:'0',opacity:1},1000,function(){$(this).animate({opacity:0},1500,function(){this.remove()})})},time);
// }

rotate_transition=function(ball,ball2){
    $(ball).rotate({
            animateTo: 180,
            duration:300,
        }
    );
    $(ball).animate({opacity:'0'},600);
    $(ball2).animate({opacity:'1'},600);
    $(ball2).rotate({
            animateTo:-360,
            duration:600
    });
}

function movejudge(r,direction,num,patternNow){
    // if(numList>0){
    //     numbox=negative;
    // }
    /*
        红色rgb(244, 86, 70);
        黑色rgb(51, 51, 51);
        默认黑球在上，所以先判断球的发射位置是上或下，再判断发射的颜色及开关
        颠倒顺序开关互换
    */
    // numbox=numList;
    launchBallColor=$(r).css('background-color');
    if(patternNow==0){
        if(direction=='shang'){
            if(launchBallColor=='rgb(244, 86, 70)'&&balo==-1||launchBallColor=='rgb(51, 51, 51)'&&balo==1){
                success(r,num,launchBallColor);
            }else{fail(r)};
        }else if(direction=='xia'){
            if(launchBallColor=='rgb(244, 86, 70)'&&balo==1||launchBallColor=='rgb(51, 51, 51)'&&balo==-1){
                success(r,num,launchBallColor);
            }
            else{fail(r)};
        }
    }else if(patternNow==1){
        if(direction=='shang'){
            if(launchBallColor=='rgb(244, 86, 70)'&&balo==1||launchBallColor=='rgb(51, 51, 51)'&&balo==-1){
                success(r,num,launchBallColor);
            }else{fail(r)};
        }else if(direction=='xia'){
            if(launchBallColor=='rgb(244, 86, 70)'&&balo==-1||launchBallColor=='rgb(51, 51, 51)'&&balo==1){
                success(r,num,launchBallColor);
            }
            else{fail(r)};
        }
    }

    appendball(patternNow);
    $(r).stop();
}

/*撞击成功*/
function success(r,borderSpacing,launchBallColor){
    $('<div class="ball_middle" style="background-color:'+launchBallColor+';display:block"></div>').appendTo(ballShow);
    $('.ball_middle').animate(
        {
            borderSpacing:borderSpacing
        },
        {
            step:function(now){
                $(this).css('transform','scale('+now+','+now+')')
            },
            duration:200
        }
    );
    $('.ball_middle').animate({opacity:'0'},200,function(){
        this.remove();
    });
    $(r).remove();

    fractionNow++;
    $('.fraction_left').html(fractionNow);
}

function fail(r){   //撞击失败
    // switch_1=1;
    for(var i=0;i<20;i++){
        var firworks=$('<div class="firworks"></div>');
        var b=new boom(firworks,$(r).offset().left,$(r).offset().top,$(r).css('background-color'));
        b.move();
    }
    $(r).remove();
	hp--;
    fail_hp=hp*100/hp_box;
    $('.hp_div_main').animate({width:fail_hp+"%"},500);
}

function boom(div,x,y,color){  //爆炸效果
    $('body').append(div);
    $(div).css({
        left:x+'px',
        top:y+'px',
        background:color
    });
    var speedX = (parseInt(Math.random()*2) == 0 ? 1 : -1)*parseInt(Math.random()*16 + 1);  //三目运算符随机移动方向，概率50%,为1时往正方向移动，负1时往反方向移动第二个随机数随机速度快慢
    var speedY = (parseInt(Math.random()*2) == 0 ? 1 : -1)*parseInt(Math.random()*20 + 1);

    this.move=function(){
        var i = 3;
        var time=setInterval(function(){
        i++;
        $(div).css({
            left:div[0].offsetLeft+speedX+'px',
            top:div[0].offsetTop+speedY+i+'px',
        })
        if(div[0].offsetLeft+div[0].offsetWidth>window.innerWidth|| div[0].offsetLeft<2 || div[0].offsetTop+div[0].offsetHeight>window.innerHeight || div[0].offsetTop<2 ){
                div.remove();       //移动出可视区域记得删除div和清除定时器
                clearInterval(time);
            }
        },1000/30)
    }
}
// movejudge=function(r,rou,red,qing,black,num,numberMode){
//     numbox=numList;
//     if(numList>0){
//         numbox=negative;
//     }
//     if($(r).css('background-color')=='rgb(239, 169, 122)' && numbox%360==rou){  //肉
//         success(r,num);
//     }else if($(r).css('background-color')=='rgb(244, 86, 70)' && numbox%360==red){  //红
//         success(r,num);
//     }else if($(r).css('background-color')=='rgb(109, 211, 206)' && numbox%360==qing){  //青
//         success(r,num);
//     }else if($(r).css('background-color')=='rgb(51, 51, 51)' && numbox%360==black){  //黑
//         success(r,num);
//     }
//     else{fail(r)};

//     appendball(numberMode);
//     $(r).stop();
// }

boxChange=function(height,width,speed){
    speed = speed||1000;
    $('.box').animate(
        {
            width:width+'px',
            height:height+'px',
        },
        {
            duration:speed,
        }
  	);
}