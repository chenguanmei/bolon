const mysql=require('mysql');
var pool=mysql.createPool({
  host:'127.0.0.1',
  port:3306,
  user:'root',
  password:'',
  database:'bl',
  connectionLimit:20
});
//导出这个链接
module.exports=pool;