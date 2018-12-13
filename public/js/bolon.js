(async function(){
    var res=await ajax({
        url:"http://localhost:3000/bolon",
        type:"get",
        dataType:"json"
    });
    //console.log(res);
    //遍历结果
    var html="";
    for(var p of res){
       var {sm,title,price}=p;
       html+=`<div>
                <img src="${sm}">
                <p>${title}</p>
                <p>RMB ${price}</p>
              </div>`;
    }
    var parent=document.querySelector("#section>div.most-wanted>div.recommand>div>div.recommand-img");
    parent.innerHTML=html;  


    //特别推荐图片左右移动
    var $imgs=$("#section .recommand .recommand-img");
    var $left=$("#section .recommand img:first");
    var $right=$left.nextAll().last();
    if(res.length<3){
        $left.addClass("disabled")
        $right.addClass("disabled")
    }   
    var move=0;
    $left.on("click",function(){
        var $left=$(this)
        if(move==0)
            $left.addClass("disabled")
        if(!$left.is(".disabled")){
            move--;
            $imgs.css("marginLeft",-352*move)
            $right.removeClass("disabled")
                  
        }
    })
    $right.on("click",function(){
        var $right=$(this)
        if(!$right.is(".disabled")){
            move++;
            $imgs.css("marginLeft",-352*move)
            $left.removeClass("disabled")
            if(res.length-move==3)
                $right.addClass("disabled")
        }
    })

    /*图片轮播*/
    var ban=document.getElementsByClassName("banner-img")[0];
    function task(){
      var im=ban.querySelector(".show");
      im.className="";
			var next=im.parentNode.nextElementSibling;
      if(next!=null)
        next.children[0].className="show"
      else{
				im.parentNode.parentNode.children[0].children[0].className="show";	
      }
    }
    var timer=setInterval(task,3000)
    ban.onmouseover=function(){
      clearInterval(timer)
    }
    ban.onmouseout=function(){
      timer=setInterval(task,3000)
    }

})()
//测试：http://localhost:3000/bolon.html->f12