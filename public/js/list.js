$(function(){
	var pno=0;
	function loadPage(kwords,no=0){
	if(!kwords){
		kwords=""
	}
	  pno=no;
	  $.ajax({
		url:"http://localhost:3000/list?kwords="+kwords,
        type:"get",
		data:{pno},
		dataType:"json",
		success:function(output){
			var {products,pageCount}=output;
			var html="";
			for(var p of products){
				var{lid,sm,title,price}=p;
				html+=`<div class="g-list">
							<a href="detail.html?lid=${lid}"><img src="${sm}" alt=""></a>
							<p><a href="detail.html?lid=${lid}" class="ell">${title}</a></p>
							<P><a href="detail.html?lid=${lid}">￥${price.toFixed(2)}</a></P>
							<a href="detail.html?lid=${lid}" class="see">查看详情</a>
						</div>`;
			}
			$plist=$("#d-section>div:last-child>div:first-child");
		    $plist.html(html);

			//分页
			var html="";
			for(var i=1;i<=pageCount;i++){
				html+=`<li><a href="#" class="${i==pno+1?'active':''}">${i}</a></li>`;
			}
			//删除中间li，因为跳转页面之后会出现重复的页码，因此需要在每一次的创建之前先删除
            var $ul=$plist.siblings();
			$ul.children(":not(:first-child):not(:last-child)").remove()
			//将html追加到“上一页之后”
			$ul.children().first().after(html)
			if(pno==0){//如果是第一页，就禁用“上一页”
                $ul.children().first().attr("disabled","true"),
                $ul.children().first().css("pointer-events","none")
                $ul.children().first().children().css("color","gray")
            }else{
                $ul.children().first().removeAttr("disabled")
                $ul.children().first().css("pointer-events","auto")
                $ul.children().first().children().css("color","black")
            }
			if(pno==pageCount-1){
                $ul.children().last().attr("disabled","true"),
                $ul.children().last().css("pointer-events","none") //鼠标设为禁用状态
                $ul.children().last().children().css("color","gray") //字体设为灰色
            }else{
                $ul.children().last().removeAttr("disabled")	
                $ul.children().last().css("pointer-events","auto")
                $ul.children().last().children().css("color","black")
            }
		}
	  })
	}
	loadPage();
    //ul已经在页面中，不需要加在loadPage()里面
    var $plist=$("#d-section>div:last-child>div:first-child");
	var $ul=$plist.siblings();
		//只有在页面首次加载时，在分页按钮的父元素上绑定一次
		$ul.on("click","a",function(e){
				e.preventDefault();
				var $a=$(this);
				//除了禁用和当前正在激活按钮之外才能点击
				if(!$a.parent().is(".active")){
                    if(typeof($a.parent().attr("disabled")!=undefined)){
                        if($a.parent().is(":first-child"))  //上一页
						var no=pno-1;//新页号=当前页号-1
					    else if($a.parent().is(":last-child"))
						var no=pno+1;//新页号=当前页号+1
					    else
						var no=$a.html()-1;  //点击的这个新页码在后台中要减1
					    loadPage(no);//重新加载新页号的页面内容		
                    }						
				}
		});
		/*下拉框效果*/
		var c=document.getElementsByClassName("c")[0];
		var	n=0;
			c.onclick=function(){
				var c=this;
				n++;
				var cb=document.getElementsByClassName("card-body")[0];
				if(n%2!=0){
					cb.style.display="none";
				}else{
					cb.style.display="block";
				}
			}
		/*克隆*/
		$(".card-body ul li").on("click",function(){
			if(!$(this).parent().hasClass("hasclo")){   /*给当前元素的父元素加一个类，这样出现的li只会是从不同的ul出来的*/
				$(this).clone().appendTo(".selects");
				$(this).parent().addClass("hasclo");
				/*清除单个标签*/
				$(".selects li").on("click",function(){
					$(this).remove();
				})
				/*搜索*/
				var kwords="";
				$(".selects li").each((i,elem)=>{
					$li=$(elem);
					kwords+=$li.html()+",";
					loadPage(kwords);
				})
				
			}
		})
		/*清除*/
		$(".clearAll").on("click",function(){
			$(".selects").html("");
			$(".card-body ul").removeClass("hasclo");
			kwords="";
			loadPage(kwords);
		})

	
})





  