$(document).ready(function(){

    //实现最顶部二级菜单的显示与隐藏
    $("#top>ul>li").hover(function(){
        $("#ull").css("display","block");
        $("#header-top").css("background-image","linear-gradient(to bottom,rgba(0,0,0,1),rgba(0,0,0,.6)");
    });
    $("#top>ul").hover(function(){},function () {
        $("#ull").css("display","none");
        $("#header-top").css("background-image","linear-gradient(to bottom,rgba(0,0,0,1),rgba(255,255,255,0)")
    });

    //实现个人中心的现实与隐藏
    $("#user").hover(function () {
        $("#userInfo").css("display","block");
    },function() {$("#userInfo").css("display","none")});

    var imgppt=$("#imgppt");
    var imgpptImg=$("#imgppt-img");
    var btnlist=$("#imgppt-info>ul>li");
    var next=$("#rightbtn");
    var prev=$("#leftbtn");
    var index=1;



    //轮播图左右箭头的实现
    next.click(function(){
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
        btnlist[i].onclick=function () {
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
        var left=imgpptImg.css('left');
        imgpptImg.css('left',parseInt(left)+offset +'px');
        if(parseInt(left)> -820){
            imgpptImg.css('left','-4100'+'px');
        }
        if(parseInt(left)<-4100){
            imgpptImg.css('left','-820'+'px');
        }
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