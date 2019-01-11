$(window).ready(function(){

    //3d魔方的绘制
    $('#sbox>div').each(function () {
        var nowthisDiv = $(this);
        var thisDivIndex=nowthisDiv.index();
        if(thisDivIndex>=0 && thisDivIndex<=8){
            //左边的面
            drew(0,nowthisDiv,-100);
        }else if (thisDivIndex >= 9 && thisDivIndex <= 17) {
            //中间面
            drew(9,nowthisDiv,0);
        }else{
            //右边面
            drew(18,nowthisDiv,100);
        }
    });
    // $(document).mousemove(function (e) {
    //     var x=e.clientX;
    //     var y=-e.clientY;
    //     $("#sbox").css("transform","rotateX("+y+"deg)"+""+"rotateY("+x+"deg)"+"translateZ(-150px)");
    //
    // });

    // var move=false;
    // var mousex;
    // var mousey;
    // $(document).mousedown(function () {
    //     move=true;
    //     var aa=$(this);
    //     mousex=aa.clientX;
    //     mousey=aa.clientY;
    // }).mousemove(function (e) {
    //     var aa=$(this);
    //     var thisx=aa.clientX;
    //     var thisy=aa.clientY;
    //     var dtx=thisx-mousex;
    //     var dty=thisy-mousey;
    //     if(move){
    //
    //     }
    // }).mouseup(function () {
    //     move=false;
    // });
    //

    function drew(num,divE,translatex){
        var index=divE.index();
        var now =index-num;
        var translatey;
        var translatez;
        if(now>=0 && now<=2){
            translatey=-100;
        }else if(now>=3 && now<=5){
            translatey=0;
        }else{
            translatey=100;
        }
        if(now===0||now===3||now===6){
            translatez=-100;
        }else if(now===1||now===4||now===7){
            translatez=0;
        }else{
            translatez=100;
        }
        divE.css('transform','translateX('+translatex+'px)'+' '+'translateY('+translatey+'px)'+' '+'translateZ('+translatez+'px)');

        divE.find('li').each(function () {
            var thisli=$(this);
            var index=thisli.index();
            switch(index)
            {
                case 0:
                    thisli.css({'background-color':'yellow','transform':'translateX(-50px) rotateY(90deg)'});
                    break;
                case 1:
                    thisli.css({'background-color':'black','transform':'translateX(50px) rotateY(-90deg)'});
                    break;
                case 2:
                    thisli.css({'background-color':'orange','transform':'translateY(50px) rotateX(90deg)'});
                    break;
                case 3:
                    thisli.css({'background-color':'red','transform':'translateY(-50px) rotateX(90deg)'});
                    break;
                case 4:
                    thisli.css({'background-color':'blue','transform':'translateZ(-50px)'});
                    break;
                case 5:
                    thisli.css({'background-color':'green','transform':'translateZ(50px)'});
                    break;
                default:
                    alert('程序发生错误')
            }
        })
    }

});
