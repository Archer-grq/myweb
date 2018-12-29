$(document).ready(function(){
    //右侧功能栏部分
    //
    //
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


    //顶部菜单部分
    //
    //
    //实现最顶部二级菜单的显示与隐藏
    $("#top>ul>li").hover(function(){
        $("#header-top").css("background-image","linear-gradient(to bottom,rgba(0,0,0,1),rgba(0,0,0,.6)");
        $("#ull").stop().slideDown(200);
    });
    $("#top>ul").hover(function(){},function () {
        $("#ull").stop().slideUp(0);
        $("#header-top").css("background-image","linear-gradient(to bottom,rgba(0,0,0,1),rgba(255,255,255,0)")
    });
    //掌盟图标显示隐藏
    $("#zmimg").hover(function () {
        $("#dzp").stop().fadeIn(400)
    },function () {
        $("#dzp").stop().fadeOut(400)
    });
    //实现个人中心的现实与隐藏
    $("#user").hover(function () {
        $("#userInfo").stop().fadeIn(400);
    },function() {$("#userInfo").stop().fadeOut(200)});



    //轮播图部分
    //
    //
    var imgpptImg=$("#imgppt-img");
    var btnlist=$("#imgppt-info>ul>li");
    var animated=false;//让轮播图动画播放完成之后才能播放下一个的参数
    var index=1;//用来存储当前图片的索引从一开始
    var timer;
    play();
    //左右切换按钮的显示与隐藏
    $("#imgppt").hover(function(){
        $("#rightbtn").show();
        $("#leftbtn").show();
        stopstop();
    },function(){
        $("#rightbtn").hide();
        $("#leftbtn").hide();
        play();
    });
    //轮播图左右箭头的实现
    $("#rightbtn").click(function(){
        if(animated){return;}
        if(index === 5){index=1}
        else{index+=1;}
        showBtn();
        animates(-820);
    });
    $("#leftbtn").click(function(){
        if(animated){return ;}
        if(index === 1){index=5;}
        else{index-=1;}
        showBtn();
        animates(820);
    });

    //轮播图底部按钮绑定事件
    btnlist.each(function () {
        $(this).mouseover(function () {
            if(animated){
                return ;
            }
            var myindex=parseInt($(this).index())+1;
            var offset=-820*(myindex-index);
            index=myindex;
            showBtn();
            animates(offset);
        });
    });
    //图片切换动画
    function animates(offset){
        animated=true;
        var newleft=parseInt(imgpptImg.css('left'))+offset;
        $("#imgppt-img").animate({"left":newleft},100,function () {
            animated=false;
            if(newleft>-800){
                imgpptImg.css('left','-4100'+'px');
            }
            if(newleft<-4100){
                imgpptImg.css('left','-820'+'px');
            }
        })
    }
    //自动播放功能的功能实现
    function play(){
        timer=setInterval(function(){
            $("#rightbtn").click();
        },2000)
    }
    function stopstop(){
        clearInterval(timer);
    }
    //下方按钮的显示
    function showBtn(){
        btnlist.eq(index-1).addClass('on').siblings().removeClass('on')
    }

    //新闻部分
    //
    //顶部菜单效果显示
    $("#news-top>ul>li").each(function () {
       $(this).bind('mouseover',function(){
           $(this).addClass('onthis').siblings().removeClass('onthis');
           showUl($("#new-content>ul"),$(this).index());
       })
    });

    //活动功能实现
    //
    //
    $("#act-top-ul>li").each(function () {
        $(this).bind('mouseover',function () {
            $(this).addClass('ononon').siblings().removeClass('ononon');
            showUl($("#act-cotent>ul"),$(this).index())
        })
    });
    //显示UL
    function showUl(ev,index) {
        ev.eq(index).addClass('onshow').siblings().removeClass('onshow')
    }
});
