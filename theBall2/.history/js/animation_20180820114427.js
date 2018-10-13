

// 抖动效果
jQuery.fn.shake = function (intShakes /*Amount of shakes*/, intDistance /*Shake distance*/, intDuration /*Time duration*/) {
    this.each(function () {
        var jqNode = $(this);
        jqNode.css({ position: 'relative' });
        for (var x = 1; x <= intShakes; x++) {
            jqNode.animate({ left: (intDistance * -1) }, (((intDuration / intShakes) / 4)))
            .animate({ left: intDistance }, ((intDuration / intShakes) / 2))
            .animate({ left: 0 }, (((intDuration / intShakes) / 4)));
        }
    });
    return this;
}

function callarrow(arrow_html){  //初始化提升动画
    for(var i=0;i<10;i++){
        var a=new addarrow(i);
        a.move();
    }

    $('.arrow').append('<span>'+arrow_html+'</span>');
    $('.arrow span').animate({top:'0',opacity:1},600,function(){$(this).animate({opacity:0},800,function(){this.remove()})});
}

function addarrow(i){  //难度提升动画
    var leftnum=parseInt(Math.random()*500);
    var topnum=parseInt(Math.random()*400);
    var arrow=$(' <img src="img/Arrow.png" class="img">');
    var now=(Math.random()*1.1+0.75).toFixed(2);

    $('.arrow').append(arrow);
    $('.img')[i].style.cssText="top:"+topnum+"px;left:"+leftnum+"px;transform:scale("+now+","+now+")";

    this.move=function(i){
        $('.img').animate({top:'-100',opacity:'0'},700,function(){
            this.remove();
        });
    }
}
function endarrow(innertHTML,time){
    $('.arrow').append('<span>'+innertHTML+'</span>');
    setTimeout(function(){$('.arrow span').animate({top:'0',opacity:1},1000,function(){$(this).animate({opacity:0},1500,function(){this.remove()})})},time);
}

function rotate_transition(ball,ball2){
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

function movejudge(r,direction,patternNow,egg,green,black,red){
    /*
        红色rgb(244, 86, 70);
        黑色rgb(51, 51, 51);
        默认黑球在上，所以先判断球的发射位置是上或下，再判断发射的颜色及开关
        颠倒顺序开关互换
    */
    haha=numList;
    if(haha>0){
        haha=negative;
    }
    launchBallColor=$(r).css('background-color');
    if(patternNow==0){
        if(direction=='shang'){
            if(launchBallColor=='rgb(244, 86, 70)'&&balo==-1||launchBallColor=='rgb(51, 51, 51)'&&balo==1){
                success(r,4,launchBallColor);
            }else{fail(r)};
        }else if(direction=='xia'){
            if(launchBallColor=='rgb(244, 86, 70)'&&balo==1||launchBallColor=='rgb(51, 51, 51)'&&balo==-1){
                success(r,4,launchBallColor);
            }
            else{fail(r)};
        }
    }else if(patternNow==1){
        if(direction=='shang'){
            if(launchBallColor=='rgb(244, 86, 70)'&&balo==1||launchBallColor=='rgb(51, 51, 51)'&&balo==-1){
                success(r,4,launchBallColor);
            }else{fail(r)};
        }else if(direction=='xia'){
            if(launchBallColor=='rgb(244, 86, 70)'&&balo==-1||launchBallColor=='rgb(51, 51, 51)'&&balo==1){
                success(r,4,launchBallColor);
            }
            else{fail(r)};
        }
    }else if(patternNow==2){
            if(launchBallColor=='rgb(239, 169, 122)'&&Math.abs(haha%360)==egg){/*肉色*/
                success(r,4,launchBallColor);
            }else if(launchBallColor=='rgb(109, 211, 206)'&&Math.abs(haha%360)==green){/*青色*/
                success(r,4,launchBallColor);
            }else if(launchBallColor=='rgb(51, 51, 51)'&&Math.abs(haha%360)==black){/*黑色*/
                success(r,4,launchBallColor);
            }else if(launchBallColor=='rgb(244, 86, 70)'&&Math.abs(haha%360)==red){/*红色*/
                success(r,4,launchBallColor);
            }else{fail(r)};
        
        // if(direction=='shang'){
        //     if(launchBallColor=='rgb(239, 169, 122)'&&Math.abs(numList%360)==270){/*肉色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(109, 211, 206)'&&Math.abs(numList%360)==90){/*青色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(51, 51, 51)'&&Math.abs(numList%360)==180){/*黑色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(244, 86, 70)'&&Math.abs(numList%360)==0){/*红色*/
        //         success(r,4,launchBallColor);
        //     }else{fail(r)};
        // }else if(direction=='xia'){
        //     if(launchBallColor=='rgb(239, 169, 122)'&&Math.abs(numList%360)==90){/*肉色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(109, 211, 206)'&&Math.abs(numList%360)==270){/*青色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(51, 51, 51)'&&Math.abs(numList%360)==0){/*黑色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(244, 86, 70)'&&Math.abs(numList%360)==180){/*红色*/
        //         success(r,4,launchBallColor);
        //     }else{fail(r)};
        // }else if(direction=='left'){
        //     if(launchBallColor=='rgb(239, 169, 122)'&&Math.abs(numList%360)==0){/*肉色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(109, 211, 206)'&&Math.abs(numList%360)==180){/*青色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(51, 51, 51)'&&Math.abs(numList%360)==270){/*黑色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(244, 86, 70)'&&Math.abs(numList%360)==90){/*红色*/
        //         success(r,4,launchBallColor);
        //     }else{fail(r)};
        // }else if(direction=='right'){
        //     if(launchBallColor=='rgb(239, 169, 122)'&&Math.abs(numList%360)==180){/*肉色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(109, 211, 206)'&&Math.abs(numList%360)==0){/*青色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(51, 51, 51)'&&Math.abs(numList%360)==90){/*黑色*/
        //         success(r,4,launchBallColor);
        //     }else if(launchBallColor=='rgb(244, 86, 70)'&&Math.abs(numList%360)==270){/*红色*/
        //         success(r,4,launchBallColor);
        //     }else{fail(r)};
        // }
    }
    if(patternNow==2){
        appendball();
    }else{
        appendball(patternNow);
    }
    $(r).stop();
}

/*撞击成功*/
function success(r,borderSpacing,launchBallColor){
    $('<div class="ball_middle" style="background-color:'+$(r).css('background-color')+';display:block"></div>').appendTo(ballShow);
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


function boxChange(height,width,speed){
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