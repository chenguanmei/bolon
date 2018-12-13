/*商品详情和用户评论*/
document.querySelector(".tab-con>div:first-child").style.zIndex=10;
var tabs=document.querySelectorAll("[data-toggle=tab]");
 for(var tab of tabs){
    tab.onclick=function(){
        var tab=this;
        var aas=document.querySelectorAll("#section-dt .tab li a");
        for(var item of aas){
            item.className="";
        }
        tab.className="cli";
        var divs=document.querySelectorAll(".tabs>.tab-con>div");
        for(var div of divs){
            div.style.zIndex="";
        }
        var id=tab.getAttribute("data-target");  
        var div=document.querySelector(id);
        div.style.zIndex=10;       
    }
}

/*下拉效果*/
var heads=document.querySelectorAll(".details .card-header");
var c=0;
for(var head of heads){
    head.onclick=function(){
        var head=this;
        var bs=document.querySelectorAll(".details .card-body");
        for(var b of bs){
            b.style.display="none";
        }
        var body=head.nextElementSibling;
        c++;
        if(c%2!=0){
            body.style.display="block";
        }else{ 
            body.style.display="none";
        }
    }
}

/*放大镜效果 */
var s=document.querySelector("#content-dt .super-mask");
var m=document.querySelector("#content-dt .mask");
var lg=document.querySelector("#content-dt .div-lg");
var im=document.querySelector("#content-dt ")
s.onmouseover=function(){
    m.style.display="block";
    lg.style.display="block";
}  
s.onmouseout=function(){
    m.style.display="none";
    lg.style.display="none";
}
var maxX=600-300;
var maxY=433-216.5;
s.onmousemove=function(e){
    var left=e.offsetX-150;
    var top=e.offsetY-108;
    if(left<0) left=0;
    else if(left>maxX) left=maxX;
    if(top<0) top=0;
    else if(top>maxY) top=maxY;
    m.style.top=top+"px";
    m.style.left=left+"px";
    lg.style.backgroundPosition=(-2*left)+"px "+(-2*top)+"px";
}

/*控制被放大图片的背景图,和图片的大图 */
var chos=document.querySelectorAll(".choose-img img");
var lg=document.querySelector("#content-dt .div-lg"); 
var pic=document.querySelector(".left-img .pic");
for(var cho of chos){
    cho.onclick=function(){
        var cho=this;
        var src=cho.getAttribute("src");
        var lsrc="../"+src;
        lg.style.background="url("+lsrc+")";
        pic.setAttribute("src",lsrc);
    }
}


/*加入购物车 */
var add=document.querySelector("#section-dt .add");
add.onclick=function(){
    if(location.search.indexOf("lid=")!=-1){
        var lid=location.search.split("=")[1];
        $.ajax({
            url:"http://localhost:3000/user/isLogin",
            type:"get",
            dataType:"json",
            success:function(res){
                if(res.code==0){
                    alert("您还未登录，请先登录");
                    location.href="login.html";
                }else{
                    $.ajax({
                        url:"http://localhost:3000/cart/add",
                        type:"get",
                        data:{lid},
                        dataType:"json",
                        success:function(res){
                            if(res.affectedRows>0){
                                alert("成功添加到购物车");
                            }else{
                                alert("添加失败");
                            }
                        }
                    })
                }
            }
            
        })
            
    }
    
}




