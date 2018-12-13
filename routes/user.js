const express=require('express');
//引入连接池
const pool=require('../pool.js');
//创建路由器
var router=express.Router();
//在路由器下添加路由
//1.验证手机号是否已被注册
router.get('/selectPhone',(req,res)=>{
  var $rphone=req.query.rphone;
  if(!$rphone){
    res.send('2');
    return;
  }
  var sql='select * from user where phone=?';
  pool.query(sql,[$rphone],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send('1');
      return;
    }else{
      res.send('0');
    }
  })
})
//2、用户注册
router.post('/register',(req,res)=>{
  var obj=req.body;
  //验证手机号是否为空
  var $rphone=obj.rphone;
  var $rupwd=obj.rupwd;
  if(!$rphone){
    res.send('2');
	  return;
  };
  //通过以上验证，执行插入操作
  var sql='insert into user values(null,?,?)';
  pool.query(sql,[$rphone,$rupwd],(err,result)=>{
    if(err) throw err;
    res.send("注册成功");
  });
});

//登录
router.post('/login',(req,res)=>{
  var $phone=req.body.phone;
  var $upwd=req.body.upwd;
  var sql='SELECT * FROM user WHERE phone=? AND upwd=?';
  pool.query(sql,[$phone,$upwd],(err,result)=>{
	  if(err) throw err;
	  if(result.length>0){
      var user=result[0];
      req.session=user.uid;
      console.log(req.session);
	    res.send('3');
	  }else{
	    res.send('4');
	  }
  });
})

//判断是否登录成功
router.get("/isLogin",(req,res)=>{
  var uid=req.session;
  console.log(req.session);
  if(uid==undefined){
    res.send({code:0})
  }else{
    //var uid=req.session;
    var sql="select * from user where uid=?"
    pool.query(sql,[uid],(err,result)=>{
      if(err) throw err;
      phone=result[0].phone;
      res.send({code:1,phone:phone});
    })
  } 
})


module.exports=router;