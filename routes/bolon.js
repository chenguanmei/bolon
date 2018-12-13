const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
    var sql=`SELECT * FROM glass WHERE fname='BC7003' OR fname='BL5002'`;
    pool.query(sql,[],(err,result)=>{   //这一页是不需要参数的
        if(err) console.log(err);//如果sql语句有错就会输出错误
        res.send(result);
    })
})
//测试地址：http://localhost:3000/bolon/


module.exports=router;