const express=require("express");
const router=express.Router();
const pool=require("../pool");
/*显示购物车列表 */
router.get("/",(req,res)=>{
    var sql="select g.sm sm,g.title title,g.color color,g.texture tx,g.shape shape,g.price price,c.count count from cart c,glass g  where c.lid=g.lid";
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        res.send(result);
    })
})
/*加入购物车 */
router.get("/add",(req,res)=>{
    var lid=req.query.lid;/*数量默认为1 */
    var count=1;
    var sql="select count(id) from cart where lid=?"
    pool.query(sql,[lid],(err,result)=>{
        if(err) throw err;
        if(res.length==0){
            var sql="insert into cart where values(null,?,?)";
            pool.query(sql,[lid,count],(err,resdult)=>{
                if(err) throw err;
                res.send(result);
            })
        }else{
            var sql="update cart set count=count+? where lid=?";
            pool.query(sql,[count,lid],(err,result)=>{
                if(err)throw err;
                res.send(result);
            })
        }
    })
})


module.exports=router;