$(document).ready(function(){
    //右侧功能栏部分
    //
    //
    //右侧菜单功能实现
    $(window).scroll(function () {
        var scolltop=$(window).scrollTop();
        //当滚动条滚动到一定距离时回到顶部的显示与隐藏
        if(scolltop>250){
            $("#right-nav").css("bottom","0px");
        }else{
            $("#right-nav").css("bottom","-60px")
        }
        //当滚动条滚动到活动相应区域时右侧菜单栏活动按钮的样式改变
        if(scolltop>=450 && scolltop<1100){
            $("#right-nav>ul>li").eq(0)
                                 .find('a')
                                 .css({"color":"#1da6ba","font-weight":"900"})
                                 .end()
                                 .trigger('myclick')//模拟事件myclick
        }else{
            $("#right-nav>ul>li").eq(0)
                                 .find('a')
                                 .css({"color":"#92a8ab","font-weight":"400"})
        }
    });
    //回到顶部功能实现
    var rightNavLi=$("#right-nav>ul>li");
    rightNavLi.eq(5).click(function () {
        $(window).scrollTop(0);
    });
    //热门活点击功能实现与动画的实现
    rightNavLi.eq(0)
              .click(function () {
                 $(window).scrollTop(750);
               })
              .end()
              .eq(0)
              .bind('myclick',function () {
                // 当页面滚动到热门活动时触发一次小图标的动画
                $(this).find('span').css({"animation":""});
                $(this).find('span').css({"animation":"bigsmall 0.5s ease-in-out 1"});
                //动画完成后改变css样式方便下一次动画
                setTimeout(function () {
                    rightNavLi.eq(0).find('span').css({"animation":""});
                },500)
              });
    //右侧固定导航栏HOVER效果
    $("#right-nav li").hover(function () {
        $(this).find('a').css({"color":"#1da6ba","font-weight":"900",'letter-spacing':'2'})
    },function () {
        $(this).find('a').css({"color":"#92a8ab","font-weight":"400"})
    });


    //顶部菜单部分
    //
    //
    //实现最顶部二级菜单的显示与隐藏
    $("#top>ul>li").hover(function(){
        $("#header-top").css("background-image","linear-gradient(to bottom,rgba(0,0,0,1),rgba(0,0,0,.6)");
        $("#ull").stop().slideDown(200);//出现动画
    });
    $("#top>ul").hover(function(){},function () {
        $("#ull").stop().slideUp(0);//隐藏动画
        $("#header-top").css("background-image","linear-gradient(to bottom,rgba(0,0,0,9) 0%,rgba(0,0,0,.5) 70%,transparent 100%)")
    });
    //掌盟图标显示隐藏
    $("#zmimg").hover(function () {
        $("#dzp").stop().fadeIn(400)//出现动画
    },function () {
        $("#dzp").stop().fadeOut(400)//隐藏动画
    });
    //实现个人中心的现实与隐藏
    $("#user").hover(function () {
        $("#userInfo").stop().fadeIn(400);//显示
    },function() {$("#userInfo").stop().fadeOut(200)});//隐藏



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
        //显示左右按钮
        $("#rightbtn").show();
        $("#leftbtn").show();
        stopstop();
    },function(){
        //隐藏左右按钮
        $("#rightbtn").hide();
        $("#leftbtn").hide();
        play();
    });
    //轮播图左右箭头的实现
    $("#rightbtn").click(function(){
        if(animated){return;} //当切换动画未完成时退出函数
        if(index === 5){index=1}//如果当前是第五张图片，index指向第一张
        else{index+=1;}//index指向下一张图片
        showBtn();//显示底部按钮效果
        animates(-820);//轮播图切换动画
    });
    $("#leftbtn").click(function(){
        if(animated){return ;}//当切换动画未完成时退出函数
        if(index === 1){index=5;}//如果当前是第一张图片，index指向第五张
        else{index-=1;}//index指向前一张图片
        showBtn();//显示底部按钮效果
        animates(820);//轮播图切换动画
    });

    //轮播图底部按钮绑定鼠标经过事件
    btnlist.each(function () {
        $(this).mouseover(function () {
            if(animated){
                return ;//当切换动画未完成时退出函数
            }
            var myindex=parseInt($(this).index())+1;//获取当前元素的索引值
            var offset=-820*(myindex-index);//计算需要移动的距离，将值传递给动画函数
            index=myindex;//index指向鼠标当前经过的按钮对应的图片
            showBtn();//显示底部按钮效果
            animates(offset);//轮播图切换动画
        });
    });
    //图片切换动画函数
    function animates(offset){
        animated=true;//记录动画的播放状态为正在播放
        var newleft=parseInt(imgpptImg.css('left'))+offset;
        $("#imgppt-img").animate({"left":newleft},100,function () {
            animated=false;//记录动画的播放状态为播放完成
            if(newleft>-800){//如果当前图片为最后一张，则将当前图片设置为第一张
                imgpptImg.css('left','-4100'+'px');
            }
            if(newleft<-4100){//如果当前图片为第一张，则将当前图片设置为最后一张
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
    //关闭轮播图自动播放功能的函数
    function stopstop(){
        clearInterval(timer);
    }
    //轮播图下方按钮的显示
    function showBtn(){//获取当前图片的index显示相应的底部按钮
        btnlist.eq(index-1).addClass('on').siblings().removeClass('on')
    }

    //新闻部分
    //
    //新闻顶部菜单效实现鼠标经过事件
    $("#news-top>ul>li").each(function () {
       $(this).bind('mouseover',function(){
           $(this).addClass('onthis').siblings().removeClass('onthis');
           showUl($("#new-content>ul"),$(this).index());//显示对应的子菜单
       })
    });

    //活动功能实现
    //
    //为新闻子菜单绑定鼠标经过事件
    $("#act-top-ul>li").each(function () {
        $(this).bind('mouseover',function () {
            $(this).addClass('ononon').siblings().removeClass('ononon');
            showUl($("#act-cotent>ul"),$(this).index())
        })
    });
    //通过参数显示对应的子菜单
    function showUl(ev,index) {
        ev.eq(index).addClass('onshow').siblings().removeClass('onshow')
    }
    //为活动LI添加鼠标经过事件
    $(".act-cn-li").each(function () {
        $(this).hover(function () {
            $(this).children(".act-cn-hide").fadeIn();
        },function () {
            $(this).children(".act-cn-hide").fadeOut();
        })
    })
});
