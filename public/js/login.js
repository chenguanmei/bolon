var phone=document.getElementById("phone");
var upwd=document.getElementById("upwd");
var lphone=document.querySelector(".log-phone");
var lupwd=document.querySelector(".log-upwd");
phone.onblur=function(){
  if(!phone.value){
    lphone.innerHTML="手机号不能为空";
  }else{
    lphone.innerHTML="";
  }
}
upwd.onblur=function(){
  if(!upwd.value){
    lupwd.innerHTML="密码不能为空";
  }else{
    lupwd.innerHTML="";
  }
}
function getLog(){
    var xhr=createXhr();
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4&&xhr.status==200){
        var res=xhr.responseText;
        if(res=="3"){
         alert("登录成功");
         if(location.search.startsWith("?back=")){
             var url=location.search.slice(6);
         }else{
             var url="bolon.html";
         }
         location.href=url;
       }else{
         alert("登录失败，请检查用户名或密码");
       }
     }
    }
    xhr.open("post","user/login",true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    var user_phone=phone.value;
    var user_pwd=upwd.value;
    var msg="phone="+user_phone+"&upwd="+user_pwd;
    xhr.send(msg);

  }
 // getLog();

