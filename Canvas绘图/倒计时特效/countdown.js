var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var RADIUS=8;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;

const endTime=new Date(2018,11,3,11,11,11);//倒计时停止时间
var curShowTimeSeconds = 0;//存储倒计时的秒数

window.onload=function(){

    var canvas = document.getElementById("canvas");//获取画布
    var context = canvas.getContext("2d");
    canvas.width=WINDOW_WIDTH;//设置画布宽度
    canvas.height=WINDOW_HEIGHT;//设置画布高度

    curShowTimeSeconds=getCurrentShowTimeSeconds();//通过函数获取倒计时的秒数

    setInterval(function(){
        render(context);
        update();
    },1000)
}

function update(){
    var nextShowTimeSeconds=getCurrentShowTimeSeconds();

    var nextHours=parseInt(nextShowTimeSeconds/3600);
    var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds=parseInt(nextShowTimeSeconds%60);

    var curHours=parseInt(curShowTimeSeconds/3600);
    var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
    var curSeconds=parseInt(curShowTimeSeconds%60);

    if(nextSeconds!=curSeconds){
        curShowTimeSeconds=nextShowTimeSeconds;
    }
}

//时间函数
function getCurrentShowTimeSeconds(){
    var curTime=new Date();
    var ret=endTime.getTime()-curTime.getTime();
    ret=Math.round(ret/1000);//将毫秒转化成秒

    return ret>=0?ret:0;
}

//控制时间显示时间
function render(cxt){

    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    var hours=parseInt(curShowTimeSeconds/3600);
    var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds=parseInt(curShowTimeSeconds%60);

    renderDigit(MARGIN_LEFT, MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
}

//作图函数
function renderDigit(x,y,num,cxt){
  for(var i=0;i<digit[num].length;i++)
      for(var j=0; j<digit[num][i].length;j++)
          if(digit[num][i][j]===1){
              cxt.beginPath();
              cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+2*i*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
              cxt.closePath();
              cxt.fillStyle="green";
              cxt.fill();

          }
}