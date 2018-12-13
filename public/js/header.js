$(function(){
  //1.动态创建link引用header.css
  $("<link rel='stylesheet' href='css/header.css'>").appendTo("head")
  //2.ajax请求header.html片段
  $.ajax({
    url:"http://localhost:3000/header.html",
    type:"get",
    success:function(res){
      $("#header").replaceWith(res)
      $.ajax({
        url:"http://localhost:3000/user/isLogin",
        type:"get",
        dataType:"json",
        success:function(res){
           if(res.code==1){
            var lore=document.querySelector("#header .lore");
            var after=document.querySelector("#header .after");
            lore.style.display="none";
            after.style.display="block";
            after.innerHTML="欢迎，"+res.phone;
          }
        }
      })
    }
  })
})

