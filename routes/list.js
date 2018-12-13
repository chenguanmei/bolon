const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
	var output={pageSize:9};  //每页9个商品
	output.pno=req.query.pno;  //这个程序会自己设置，一般是默认为0,也就是在程序里面的初始页码
	var kwords=req.query.kwords;
	if(kwords==null){
		var sql=`SELECT * FROM glass`;
	}
	else{
		var arr=kwords.split(",");
		console.log(arr);
		for(var i=0;i<arr.length;i++){
			arr[i]=`title like '%${arr[i]}%'`
		}
		var where=" where "+arr.join(" and ");
		var sql=`select * from glass `+where;
	}
	pool.query(sql,[kwords],(err,result)=>{
	   if(err) console.log(err);
	   output.count=result.length;  //获得总记录数
	   output.pageCount=Math.ceil(
		output.count/output.pageSize   
	   );//向上取整
	   //截取分页后的结果集
       output.products=result.slice(output.pno*9,output.pno*9+9);
	   res.writeHead(200,{
	     "Content-Type":"application/json;charset=utf-8",
		 "Access-Control-Allow-Orign":"*"
	   })
       res.write(JSON.stringify(output))
	   res.end()
	})
})


module.exports=router;