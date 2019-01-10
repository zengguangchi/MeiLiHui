/**
 * Created by Administrator on 2016/10/10 0010.
 */

$(function(){
    //先获取商品列表的商品 id 名称
    var ids = location.search.split("?")[1].split("&")[0];
    console.log(ids);
    var user =location.search.split("?")[1].split("&")[1];
    if(user){
        $("#ul_header .theLi").eq(0).find("a").html(user);
        $("#ul_header .theLi").eq(2).find("a").html("退出");
    }else {
        $("#ul_header .theLi").eq(0).find("a").html("");
        $("#ul_header .theLi").eq(2).find("a").html("登录");
    }


    //动态加载商品详情图片
    $.get("JSON/GoodsDetails.json",function(data){

        for (var i=0;i<data.length;i++){
            var obj = data[i];
            var id = obj.id;
            if(ids == id){
                var event = obj.event;
                var product = obj.product;
                var bigImg =  obj.bigImg;
                var alt = obj.alt;
                var title = obj.title;
                var smallimg1 = obj.smallimg1;
                var smallimg2 = obj.smallimg2;
                var smallimg3 = obj.smallimg3;
                var producttitle = obj.producttitle;
                var productname = obj.productname;
                var currentprice = obj.currentprice;
                var originalprice = obj.originalprice;
                var discount = obj.discount;
                var selectimg = obj.selectimg;
                var selectcolor = obj.selectcolor;
                var choosesize1 = obj.choosesize1;
                var choosesize2 = obj.choosesize2;
                var choosesize3 = obj.choosesize3;
                var changtu     =  obj.changtu;

                //添加到相应的地方
                $("#event").find("a").html(event);
                $("#productspan").html(product);
                $(".product_bigimg").find("img").attr({
                    "src"   :   bigImg,
                    "alt"   :  alt,
                    "title" : title
                });
                //放大镜大图跟着加载的图片变化，改变默认的放大镜图片
                var sr = $(".product_bigimg").find("img").attr("src").split("_")[0];
                $("#bigArea").find("img").attr("src",sr+"_900w-1200h.jpg");


                $(".selectimg").find("img").eq(0).attr({
                    "src" : smallimg1,
                    "alt"   : alt,
                    "title" : title
                });
                $(".selectimg").find("img").eq(1).attr({
                    "src" : smallimg2,
                    "alt"   : alt,
                    "title" : title
                });
                $(".selectimg").find("img").eq(2).attr({
                    "src" : smallimg3,
                    "alt"   : alt,
                    "title" : title
                })
                $(".product_title").html(producttitle);
                $(".product_name").find("h1").html(productname);
                $("#productRMB").html(currentprice);
                $("#productRMB1").html(originalprice);
                $(".product_discount").find("span").eq(0).html(discount);
                $("#chosColor").html(selectcolor);
                $("#2042204299000207740").find("img").attr("src",selectimg);
                $("#2042204299000207740").find("span").html(selectcolor);
                $(".main").find("img").attr("src",changtu);


            }
        }



        //点击小图片显示大图片
        $(".thumbs li").click(function(){
            console.log($(this).find("img").attr("src"));

            //大图变化
            var sr = $(this).find("img").attr("src").split("_")[0];
            $(".product_bigimg").find("img").attr("src",sr+"_480w-640h.jpg");
            $("#bigArea").find("img").attr("src",sr+"_900w-1200h.jpg");
        })


        //放大镜
        var _smallImg = $(".product_bigimg") ;  //小图
        var _smallArea = $("#mark") ; // 小图区域
        var _bigImg = $("#bigImg");
        var _bigArea = $("#bigArea");

        //计算小区域的宽高(不是原来样式给定的50px)
        //  width()  == innerWidth() == outerWidth()
        _smallArea.width(_bigArea.width() * _smallImg.width() / _bigImg.width() );
        _smallArea.height(_bigArea.height() * _smallImg.height() / _bigImg.height() );

        //放大系数 /  放大倍数
        var scale = _bigImg.width() / _smallImg.width();

        // mousemove
        _smallImg.mousemove(function(e){
            _smallArea.show();  //  显示小区域
            _bigArea.show();   // 显示大区域

            //clientX  : 可视区域的x的值
            //pageX : 距离窗口左边的x值,隐藏部分也算在里面
            //  x，y 表示鼠标在小图片上面移动的距离,后面除以2表示，鼠标位置如果不超过小区域的一半，小区域就不会移动
            var x = e.pageX - _smallImg.offset().left - _smallArea.width() /2 ;
            var y = e.pageY - _smallImg.offset().top - _smallArea.height() /2 ;
            //console.log(e.clientX);
            //console.log(e.pageX);

            // 控制小区域的范围在小图范围内
            if(x<=0){  // 不超出左边
                x=0;
            }else if(x >= _smallImg.width()-_smallArea.width()){ //不超出右边
                x = _smallImg.width()-_smallArea.width()
            }
            if(y<=0){ // 不超出上边
                y = 0;
            }else if( y >= _smallImg.height() -  _smallArea.height()){
                y = _smallImg.height() -  _smallArea.height()
            }

            //移动小区域
            _smallArea.css({left: x , top: y});

            //移动大图的位置
            _bigImg.css({left : -x*scale,top : -y*scale});
        })

        // mouseleave
        _smallImg.mouseleave(function(){
            _smallArea.hide()  ;  // 隐藏小区域
            _bigArea.hide();   // 隐藏大区域
        })


        //倒计时
        var date1 = new Date("2016-10-20 10:10:10");
        var now = new Date();

        var timeInterval = date1.getTime() - now.getTime();
        // 将毫秒转换为秒
        var timeSec = timeInterval /1000 ;

        // 开启定时器，开始倒计时
        setInterval(function(){
            timeSec -- ;
            var day = parseInt(timeSec/24/60/60);
            var hour = parseInt(timeSec/60/60) %24;
            var min = parseInt(timeSec/60)%60;
            var sec = parseInt(timeSec%60);
            //console.log(day + "天" + hour + "时" + min + "分钟" + sec + "秒");

            if(day<=9){
                $("#countdownDD").html("0"+day);
            }else {
                $("#countdownDD").html(day);
            }

            if(hour<=9){
                $("#countdownHH").html("0"+hour);
            }else {
                $("#countdownHH").html(hour);
            }

            if(min<=9){
                $("#countdownMM").html("0"+min);
            }else {
                $("#countdownMM").html(min);
            }

            if(sec<=9){
                $("#countdownSS").html("0"+sec);
            }else {
                $("#countdownSS").html(sec);
            }
        },1000)


        //数量选择
        var value = $("#quantity").val();
        $("#countAdd").click(function(){
            value++;
            $("#quantity").val(value);
        });
        $("#countReduce").click(function(){
            value--;
            if(value<=1){
                value = 1;
            }
            $("#quantity").val(value);
        })


        //尺寸选择
        var flag = false;
        var thisSize = "";
        var aNode = $("#product_choose_size_ul").find("a");
        aNode.click(function(){
            aNode.css({
                "background" : "#eee",
                "color"     :  "black"
            });
            $(this).css({
                "background" : "black",
                "color"     :  "white"
            })
            flag = true;
            thisSize = $(this).html();
        })

        //点击购买按钮
        $(".product_button").find("span").click(function(){
            //判断是否登录，如果登录了就可以加入购物车，如果没有登录就不行
            if(user){
                // 首先确认是否选择了尺寸
                if(!flag){
                    alert("请选择尺码");
                    return;
                }
                //以添加到cookie的方式添加购物
                //cookie为空的时候
                var name = "good";

                //cookie的  value  商品的名字与之前保存的cookie相同的时候解析商品的名字，没有就保存在一个空的数组里面
                var goodlist = $.cookie( name ) ? JSON.parse($.cookie("good")) : [];

                //  获取商品信息  $(this)表示所点击的加入购物车按钮
                var goodName = $(".product_name").find("h1").html();
                var goodPrice = $("#productRMB").html();
                var goodImg =  $("#product_choose_color_ul").find("img").attr("src");
                var goodColor = $("#chosColor").html();
                var goodSize = thisSize;
                //console.log(goodSize);

                var isExit =false;//不存在
                for(var i=0;i<goodlist.length;i++){
                    //找到每一个对象的tittle，如果cookie里面保存有这件商品，则将数量加上一个数
                    if(goodlist[i].tittle == goodName && goodlist[i].Size == goodSize){
                        goodlist[i].num += value ;
                        isExit = true;    // 把商品名字状态变为true
                        goodlist[i].Size = goodSize;
                    }
                }

                //商品不存在 添加商品对象到数组里面
                if(!isExit){
                    var ogj = {
                        tittle:goodName,
                        num:value,
                        Size  : goodSize,
                        data:{
                            tittle:goodName,
                            price : goodPrice,
                            img:goodImg,
                            Color : goodColor
                        }
                    }
                    //  添加所购买的每一件商品信息到商品列表上面
                    goodlist.push(ogj);
                }
                //购买过的商品的数组
                //解析后的字符串  是作为cookie 的value
                $.cookie(name,JSON.stringify(goodlist),{"expires":7, path:"/"});
                console.log	($.cookie(name));


                location.href = "shoppingbag.html?"+user;
            }else {
                //  如果没有登录则跳转到登录页面
                location.href = "login.html";
            }



        });

    })
})