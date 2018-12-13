/*注册 */
var form=document.forms[0];
var rphone=form.elements["rphone"];
var code=form.code;
var rupwd=form.rupwd;
var rupwd1=form.rupwd1;
rphone.onfocus=code.onfocus=rupwd.onfocus=rupwd1.onfocus=function(){
  this.nextElementSibling.className=""
} 
var isRegister=false;
function vail(txt,reg){
  var div=txt.nextElementSibling;
  if(reg.test(txt.value)){
    if(txt.id=='rphone'){
        //检查电话号码是否重复 
		  var xhr=createXhr();  
			xhr.onreadystatechange=function(){
			  if(xhr.readyState==4&&xhr.status==200){
				  var res=xhr.responseText;
					if(res=="1"){
					  $("showPhone").innerHTML="该号码已被注册";
            isRegister=false;
					}else if(res=="0"){
					  $("showPhone").innerHTML="该号码可用！";
						isRegister=true;
					}else{
            $("showPhone").innerHTML="号码不能为空";
            isRegister=false;
          }
				}
			}   
			var rphone=$("rphone").value;
			xhr.open("get","/user/selectPhone?rphone="+rphone,true);
			xhr.send(null);		
    }
    else{
			div.className="vali_success";
			div.innerHTML="验证通过";
			return true;
		}	
  }else{
    div.className="vali_fail";
    div.innerHTML="输入的格式有误"
    return false;
  }
}
rphone.onblur=function(){
  vail(this,/^(\+86|0086)?\s*1[3-8]\d{9}$/)
}
code.onblur=function(){
  vail(this,/^\w{4}$/)
}
rupwd.onblur=function(){
  vail(this,/^\w{6}$/)
}
rupwd1.onblur=function(){
  vail(this,/^\w{6}$/)
  var div=this.nextElementSibling
  if(rupwd.value!=rupwd1.value){    
    div.innerHTML="两次输入的密码不一致";
  }else{
    div.innerHTML="验证通过";
  }
}
/*打开注册框*/
var rbtn=document.querySelector("[data-toggle=modal]");
rbtn.onclick=function(){
	var resg=document.querySelector("#section .res .modal");
	var bg=document.querySelector(".bg");
	resg.style.display="block";
	bg.style.display="block";
}
/*关闭注册框 */
var clo=document.querySelector(".modal .close");
clo.onclick=function(){
	var resg=document.querySelector("#section .res .modal");
	var bg=document.querySelector(".bg");
	resg.style.display="none";
	bg.style.display="none";
}
//完成注册功能
		function register(){console.log(2)
		  if(isRegister==true){
			  //异步注册 
				var xhr=createXhr(); 
				xhr.onreadystatechange=function(){
				  if(xhr.readyState==4&&xhr.status==200){
					  var res=xhr.responseText;
            alert(res);
            window.location.href="bolon.html";
					}
				}
				xhr.open("post","/user/register",true);
				//增加消息头的设置
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				var rphone=$("rphone").value;
				var rupwd=$("rupwd").value;	
				var msg="rphone="+rphone+"&rupwd="+rupwd;
				xhr.send(msg);
			}else{
			  alert("请检查注册信息！");
			}
		}
