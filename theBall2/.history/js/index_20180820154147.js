


let time=new Date();/*时间差*/

const idxW=720;/*主界面宽高*/
const idxH=720;
const gameW=720;/*游戏宽高*/
const gameH=720;
const ballFour=['#f45646','#333','#efa97a','#6dd3ce'];/*小球颜色*/

let life;
let hp;/*当前血量*/
let hp_box;/*总血量*/
let fail_hp;/*血量条*/
let fractionNow;/*现有得分*/
let fractionNeed;/*升级需要得分*/

let patternNow;/*当前模式*/
let visited=false;/*是否进入过游戏*/

let launchNum=2;/*默认发球为两个*/
let numList;/*角度*/
let degree;/*转多少度*/
let speed;/*发射速度*/
let delayed;/*发射延迟*/
let ballShow=$('.ball');
let ballShowW=160;
let ballShowH=160;
let balo;

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
            initInfo();
            setTimeout(function(){ballReady(patternNow);},delayed)
        }
	}
}

function initInfo(){
    life=true;
    hp=1;
    hp_box=10;
    fail_hp=hp*100/hp_box;
    fractionNow=8;
    fractionNeed=10;
    numList=-180;
    degree=180;
    speed=1200;
	delayed=1100;
    balo=1;
    
    $('.fraction_left').html(fractionNow);
    $('.fraction_right').html(fractionNeed);
    $('.game_fraction').fadeIn(500);
    $('.hp_div_main').animate({width:fail_hp+"%"});

    /*小球位置及角度就绪*/
    $('.ball').animate({top:'210px'},500,function(){
        $(this).removeClass("ballZhuan");
        $(this).rotate({animateTo:numList,duration:600});/*这一步尤为重要，得分是在-180°上迭代完成的，角度不转会不衔接*/
    })
}

/*准备发射过程：判断存活-随机生成小球且随机填充发射器-发射(移动)*/
function ballReady(patternNow){  
    delayed=0;
    if(hp<=0){
        life=false;
    }
    if(life==true){
        levelUp(patternNow);
        let chooseColor=parseInt(Math.random()*launchNum);/*随机选择颜色*/
        let chooseBox=parseInt(Math.random()*launchNum);/*随机填放到各发射器中*/
        let launchBall=$('<div class="launchBall" style="background:'+ballFour[chooseColor]+';"></div>');
        launchBall.appendTo($('.launcher')[chooseBox]);
        setTimeout(function(){ballMove(launchBall,chooseBox,patternNow)},delayed);
    }else{
        $('.over').animate({opacity:1},600,function(){
            $('.button_box').css('display','block');
            $('.button_box').animate({opacity:1},800)});
    }
}

/*小球移动：判断方向-移动-到达某个位置-触发审判*/
function ballMove(launchBall,chooseBox,patternNow){
    let range;
    let goto;
    chooseBox<2 ? goto='top' : goto='left';
    chooseBox==0 ? range=350 : range=-350;
    launchBall.animate(
        {[goto]:""+range+"px"},
        {
            duration:speed,
            easing:'linear',
            progress:function(){
                      
                let launchBallW=$(this).width();
                let launchBallH=$(this).height();
                let launchBallT=$(this).offset().top;
                let launchBallL=$(this).offset().left;

                let box_top=ballShow.offset().top;
                let box_left=ballShow.offset().left;
                let box_height=ballShow.offset().top+ballShowH;
                let box_width=ballShow.offset().left+ballShowW;

                if(launchNum == 2){ //两个方向
                    if(range==350&&Math.floor(launchBallT+launchBallH)>=box_top){
                        movejudge(this,'shang',patternNow);/*上往下*/
                    }else if(range==-350&&launchBallT<=box_height){
                        movejudge(this,'xia',patternNow);/*下往上*/
                    }
                }

            }
        }
    )
}

/*关卡分数及条件设置*/
function levelUp(patternNow){
    if(patternNow==0&&fractionNow==100||patternNow==1&&fractionNow==50){
        $('.success').animate({opacity:1},600,function(){
            $('.button_box').css('display','block');
            $('.button_box').animate({opacity:1},800);
        });
        life=false;
    }
    if(fractionNow%10==0){
        callarrow("速度加快");
        fractionNeed+=20;
        speed-=100;
        delayed=1100;
    }
    $('.fraction_right').html(fractionNeed);
}




document.addEventListener('keydown',ballPlay,false);
function ballPlay(){
    if(launchNum==2&&event.keyCode==32){
        if(new Date()-time>300){
            numList+=degree;
            ballShow.rotate({
                animateTo: numList,
                duration: 450
            });
            balo*=-1;
            time=new Date();
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

    initInfo(patternNow);
    setTimeout(function(){
        ballReady(patternNow);
    },1200)
}
function backIdx(){
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