const express=require('express');
const user=require('./routes/user.js');
const bodyParser=require('body-parser');
const bolon=require('./routes/bolon.js');
const list=require('./routes/list.js');
const cart=require('./routes/cart.js');
//构建web服务器
var app=express();
app.listen(3000);
//托管静态资源
app.use(express.static('./public'));
//使用bodyParser中间件
app.use(bodyParser.urlencoded({
  extended:false
}));
//使用路由器
app.use('/user',user);
app.use('/bolon',bolon);
app.use('/list',list);
app.use('/cart',cart);