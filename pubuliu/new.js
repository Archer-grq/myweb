window.onload=function(){
	imgLocation("container","box");
	var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"}]}
	//当滚动条滚动时触发函数
	window.onscroll=function(){
		if(checkFlag()){
			var cparent=document.getElementById("container");
			for(var i=0;i<imgData.data.length;i++){
				var ccontent=document.createElement("div");
				ccontent.className="box";
				cparent.appendChild(ccontent);
				var boximg=document.createElement("div");
				boximg.className="box-img";
				ccontent.appendChild(boximg);
				var img=document.createElement("img");
				img.src="img/"+imgData.data[i].src;
				boximg.appendChild(img);
			}
			imgLocation("container","box");
		}
	}
}

//加载新元素，获取新数据
function checkFlag(){
	var cparent=document.getElementById("container");
	var ccontent=getChildElement(cparent,"box");
	var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var passageHeight=document.documentElement.clientHeight||document.body.clientHeight;
	console.log(lastContentHeight+":"+scrollTop+":"+passageHeight);
	if(lastContentHeight<scrollTop+passageHeight){
		return true;
	}
}

function imgLocation(parent,content){
	//将parent下的所有content取出来
	var cparent = document.getElementById(parent);
	var ccontent=getChildElement(cparent,content);
	var imgWidth= ccontent[0].offsetWidth;
	var num=Math.floor(document.documentElement.clientWidth/imgWidth);
	cparent.style.cssText="width:"+imgWidth*num+"px;";
	
	var BoxHeightArr=[];
	for(var i=0;i<ccontent.length;i++){
		// 获得每一列元素的高度
		if(i<num){
			BoxHeightArr[i]=ccontent[i].offsetHeight;			
		}else{
			//获取高度最小列的位置，将后面的元素放在该元素下面
			var minHeight=Math.min.apply(null,BoxHeightArr);
			var minIndex=getMinHeightLocation(BoxHeightArr,minHeight);
			ccontent[i].style.position="absolute";
			ccontent[i].style.top=minHeight+"px";
			ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
			BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
		}
	}
}

//获取最小高度的水平位置
function getMinHeightLocation(BoxHeightArr,MinHeight){
	for(var i in BoxHeightArr){
		if(BoxHeightArr[i]==MinHeight){
			return i;
		}
	}
}

//获得parent下所有content元素的数组
function getChildElement(parent,content){
	var contentArr=[];
	var allcontent=parent.getElementsByTagName("*");
	for(var i=0;i<allcontent.length;i++){
		if(allcontent[i].className==content){
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}
