$(function(){
    $.ajax({
        url:"http://localhost:3000/cart",
        type:"get",
        success:function(res){
            /*动态加载购物车 */
            var tb=document.querySelector(".cart table tbody");
            var html="";
            for(var item of res){
                var {sm,title,color,tx,shape,price,count}=item;
                total=price*count;
                html+=`
                <tr>
                    <td>
                        <input type="checkbox" class="sel">
                    </td>
                    <td>
                        <img src="${sm}"> 
                    </td>
                    <td>
                        <p class="title">${title}</p>
                    </td>
                    <td>
                        <p class="color">颜色：${color}</p> 
                        <p class="mu">材质：${tx}</p>
                        <p class="style">形状：${shape}</p>   
                    </td>
                    <td class="price">
                        <span>￥</span>
                        <span>${price.toFixed(2)}</span>
                    </td>
                    <td>
                        <button class="bt">-</button>
                        <input type="text" class="count" value="${count}">
                        <button href="#" class="bt">+</button>
                    </td>
                    <td class="total">
                        <span>￥</span>
                        <span>${total.toFixed(2)}</span>
                    </td>
                    <td>
                        <button class="del">删除</button>
                    </td>
                </tr>`;
            } 
            tb.innerHTML=html;
            /*删除购物车商品*/
            function del(){
                var dels=document.querySelectorAll("tbody .del");
                for(var del of dels){
                    del.onclick=function(){
                        var del=this;
                        var tr=del.parentNode.parentNode;
                        if(confirm("是否继续删除该商品")){
                            var table=document.querySelector("table");
                            table.deleteRow(tr.rowIndex);
                            /*删除完以后要修改总价格*/
                            var tds=document.querySelectorAll("tbody tr td:nth-child(7) span:nth-child(2)");
                            var subtotal=document.querySelector("table .sum");
                            var s=0;
                            for(var td of tds){
                                s+=parseInt(td.innerHTML);
                            }
                            subtotal.innerHTML="￥"+s.toFixed(2);
                            }
                    }
                }
            }
            /*数量加减*/
            function change(){
                var bts=document.querySelectorAll("#c-section table .bt");
                for(var bt of bts){
                    bt.onclick=function(){
                        var bt=this;
                        var count=bt.parentNode.children[1];
                        var c=parseInt(count.value);
                        /*点击改变数量*/
                        if(bt.innerHTML=="+"){
                            c++;
                        }else if(c>1){
                            c--;
                        }
                        count.value=c;
                        /*点击改变价格*/
                        var price=bt.parentNode.parentNode.children[4].children[1].innerHTML;
                        var total=bt.parentNode.parentNode.children[6].children[1];
                        total.innerHTML=(price*c).toFixed(2)
                        var tds=document.querySelectorAll("tbody tr td:nth-child(7) span:nth-child(2)");
                        var subtotal=document.querySelector("table .sum");
                        var s=0;
                        for(var td of tds){
                            s+=parseInt(td.innerHTML);
                        }
                        subtotal.innerHTML="￥"+s.toFixed(2);
                    }
                } 
            }
            /*全选*/
            function selAll(){
                var selAll=document.querySelector("#c-section table .selAll");
                var selAllf=document.querySelector("#c-section table .selAllf");
                //点击上面一个全选按钮时
                selAll.onclick=function(){
                    var selAll=this;
                    selAllf.checked=selAll.checked;
                    var sels=document.querySelectorAll("#c-section table .sel");
                    for(var sel of sels){
                        sel.checked=selAll.checked;
                    }
                    calPrice();
                }
                //点击下面一个全选按钮时
                selAllf.onclick=function(){
                    var selAllf=this;
                    selAll.checked=selAllf.checked;            
                    for(var sel of sels){
                        sel.checked=selAllf.checked;
                    }
                    calPrice();
                }
                //其他子按钮被点击时
                var sels=document.querySelectorAll("#c-section table .sel");
                var total=0;
                var sels=document.querySelectorAll("#c-section table .sel");
                for(var sel of sels){
                    sel.onclick=function(){
                        var sel=this;
                        if(sel.checked==false){
                            selAll.checked=selAllf.checked=false;
                        }else{
                            var nocheck=document.querySelector("#c-section table .sel:not(:checked)");
                            if(nocheck!=null){
                                selAll.checked=selAllf.checked=false
                            }else{
                                selAll.checked=selAllf.checked=true;
                            }
                        }
                        calPrice()     
                    }
                }   
            }
            setTimeout(del,500);
            setTimeout(change,500);
            setTimeout(selAll,500);
            //计算总价格
            function calPrice(){
                var total=0;
                var sels=document.querySelectorAll("#c-section table .sel");
                for(var sel of sels){
                    if(sel.checked){
                        var pri=sel.parentNode.parentNode.children[4].children[1].innerHTML;
                        var count=sel.parentNode.parentNode.children[5].children[1].value;
                        var sSum=pri*count;
                        total+=sSum;
                    }
                }
                console.log(total);
                var s=document.querySelector(".sum");
                s.innerHTML="￥"+total.toFixed(2);
            }
        }
    })
})


