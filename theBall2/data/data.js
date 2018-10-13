
/*
patternName：模式名称
explain：游戏说明
condition：过关条件
produce：关卡介绍
tip：其他
*/
var pattern=[
    {
        patternName:'标准模式',
        explain:{
            condition:'100分',
            produce:'关卡为5个，得满100分即为通关',
            tip:''
        }
    },
    {
        patternName:'颠倒模式',
        explain:{
            condition:'50分',
            produce:'关卡为3个，小球撞击位置需与发球相反，游戏难度随得分增加',
            tip:''
        }
    }
]
var gameInit=[
    {
        hp:1,
        hp_box:10,
        fraction:0,
        toplimit:10,
        
    }
]
// var gameHanlder={
//     gameOver="Game Over",
//     gameSuccess="游戏通关",
// }