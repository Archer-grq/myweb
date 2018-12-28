$(document).ready(function(){

    //右侧菜单功能实现
    $(window).scroll(function () {
        var scolltop=$(window).scrollTop();
        if(scolltop>250){
            $("#right-nav").css("bottom","0px");
        }else{
            $("#right-nav").css("bottom","-60px")
        }

    });

    //回到顶部功能实现
    $(".ii6").click(function () {
        $(window).scrollTop(0);
    });

    // function top(){
    //     var nzv=$("#right-nav");
    //     if(nzv.css("bottom")<0){
    //         nzv.css("bottom",parseInt(nzv.css("bottom"))+2+"px");
    //         setTimeout(top(),10)
    //     }
    //
    // }
    // function btm(){
    //     var nzv=$("#right-nav");
    //     if(nzv.css("bottom")>-60){
    //         nzv.css("bottom",parseInt(nzv.css("bottom"))-2+"px");
    //         setTimeout(btm(),10)
    //     }
    //
    // }

    //实现最顶部二级菜单的显示与隐藏
    $("#top>ul>li").hover(function(){
        $("#ull").show();
        $("#header-top").css("background-image","linear-gradient(to bottom,rgba(0,0,0,1),rgba(0,0,0,.6)");
    });
    $("#top>ul").hover(function(){},function () {
        $("#ull").hide();
        $("#header-top").css("background-image","linear-gradient(to bottom,rgba(0,0,0,1),rgba(255,255,255,0)")
    });

    //实现个人中心的现实与隐藏
    $("#user").hover(function () {
        $("#userInfo").css("display","block");
    },function() {$("#userInfo").css("display","none")});

    //轮播图使用到的标签
    var imgppt=$("#imgppt");
    var imgpptImg=$("#imgppt-img");
    var btnlist=$("#imgppt-info>ul>li");
    var next=$("#rightbtn");
    var prev=$("#leftbtn");
    var animated=false;
    var index=1;//用来存储当前图片的索引
    var timer;

    play();


    //左右切换按钮的显示与隐藏
    imgppt.hover(function(){
        next.show();
        prev.show();
        stopstop();
    },function(){
        next.hide();
        prev.hide();
        play();
    });

    //轮播图左右箭头的实现
    next.click(function(){
        if(animated){
            return;
        }
        if(index == 5){
            index=1
        }
        else{
            index+=1;
        }
        showBtn();
        animate(-820);
    });
    prev.click(function(){
        if(animated){
            return ;
        }
        if(index == 1){
            index=5;
        }
        else{
            index-=1;
        }
        showBtn();
        animate(820);
    });

    //底部按钮切换图片功能实现
    for(var i=0;i<btnlist.length;i++){
        btnlist[i].onmouseover=function () {
            if(animated){
                return ;
            }
            var myindex=parseInt($(this).index())+1;
            console.log($(this).index());
            var offset=-820*(myindex-index);
            index=myindex;
            showBtn();
            animate(offset);
        }
    }








    //图片切换动画
    function animate(offset){
        animated=true;
        var time=205;
        var interval=5;
        var speed=offset/(time/interval);//每次的位移量
        var newleft=parseInt(imgpptImg.css('left'))+offset;
        go();
        //左右移动的动画
        function go(){
            if((speed<0&&parseInt(imgpptImg.css('left'))>newleft)||(speed>0&&parseInt(imgpptImg.css('left'))<newleft)){
                imgpptImg.css('left',parseInt(imgpptImg.css('left'))+speed +'px');
                setTimeout(go,interval);
            }else{
                animated=false;
                if(newleft>-800){
                    imgpptImg.css('left','-4100'+'px');
                }
                if(newleft<-4100){
                    imgpptImg.css('left','-820'+'px');
                }
            }
        }
    }

    function play(){
        timer=setInterval(function(){
            next.click();
        },2000)
    }
    function stopstop(){
        clearInterval(timer);
    }
//下方按钮的显示
    function showBtn(){
        for(var i=0;i<btnlist.length;i++){
            if(btnlist[i].className == "on"){
                btnlist[i].className = "";
                break;
            }
        }
        btnlist[index - 1].className='on';
    }
});



