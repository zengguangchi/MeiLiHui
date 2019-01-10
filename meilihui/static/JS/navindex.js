/**
 * Created by Administrator on 2016/9/28 0028.
 */

//导航栏样式
$(function(){
    $(".nav1 .navLi").eq(1).hover(function(){
        $(".pop_up1").show();
        console.log($(this));
        $(this).find("a").eq(0).css("color","red")
    },function(){
        $(".pop_up1").hide();
        $(this).find("a").eq(0).css("color","white")
    })
    $(".nav1 .navLi").eq(2).hover(function(){
        $(".pop_up2").show();
        $(this).find("a").eq(0).css("color","red")
    },function(){
        $(".pop_up2").hide();
        $(this).find("a").eq(0).css("color","white")
    })
    $(".nav1 .navLi").eq(3).hover(function(){
        $(".pop_up3").show();
        $(this).find("a").eq(0).css("color","red")
    },function(){
        $(".pop_up3").hide();
        $(this).find("a").eq(0).css("color","white")
    })
    $(".nav1 .navLi").eq(4).hover(function(){
        $(".pop_up4").show();
        $(this).find("a").eq(0).css("color","red")
    },function(){
        $(".pop_up4").hide();
        $(this).find("a").eq(0).css("color","white")
    })
    $(".nav1 .navLi").eq(5).hover(function(){
        $(".pop_up5").show();
        $(this).find("a").eq(0).css("color","red")
    },function(){
        $(".pop_up5").hide();
        $(this).find("a").eq(0).css("color","white")
    })
    $(".nav1 .navLi").eq(6).hover(function(){
        $(".pop_up6").show();
        $(this).find("a").eq(0).css("color","red")
    },function(){
        $(".pop_up6").hide();
        $(this).find("a").eq(0).css("color","white")
    })
    $(".nav1 .navLi").eq(7).hover(function(){
        $(".pop_up7").show();
        $(this).find("a").eq(0).css("color","red")
    },function(){
        $(".pop_up7").hide();
        $(this).find("a").eq(0).css("color","white")
    })

    //购物袋
    $(".shopping_bag").hover(function(){
        $(".pop_up_shopping").show();
    },function(){
        $(".pop_up_shopping").hide();
    });
    $(".pop_up_shopping").hover(function(){
        $(".pop_up_shopping").show();
    },function(){
        $(".pop_up_shopping").hide();
    })
    $(".button_close").click(function(){
        $(".pop_up_shopping").hide();
    })

    //轮播图

    // 1，获取数据
    $.get("json/lunbo.json",function(data){
        console.log(data);

        //2 显示数据在页面上
        // 遍历data 数组， 将每个图片显示在页面上
        for(var i=0;i<data.length;i++){
            var obj = data[i];
            var img = obj.img; //img
            var id = obj.id;  //id

            //将创建好的节点添加到页面上
            //"<li><img src="img/b1.jpg" /></li>"
            $("#list").append("<li><img src="+ img + " /></li>");
            $("#list2").append("<li>"+ (i+1)+"</li>");

            //初始化 把第一个li的样式变为选中状态
            if(i==0){
                $("#list2 li").addClass("active");
            }
        }

        //显示隐藏APP下载二维码
        $(".quick_access_right ul").find("li").eq(2).hover(function(){
            $(".app").show();
            $(this).find("a").css("color","red");
        },function(){
            $(".app").hide();
            $(this).find("a").css("color","black");
        })



        // 开启轮播图
        lunbo();

    })

    // 因为程序是从上往下执行的，如果不把轮播函数封装成一个函数，上面获取不到数据
    function lunbo(){
        var _list1 = $("#list");
        var _list2 = $("#list2");
        var _li1 = $("#list li");
        var _li2 = $("#list2 li");

        //复制第一张图到最后
        _li1.first().clone().appendTo(_list1);

        var size = $("#list li").length; // 图片的总张数
        console.log(size); // 5
        var iWidth = $("#list li").width();

        var i = 0; // 即将显示的图片的下标

        // 开启定时器，自动轮播
        var timer = setInterval(function(){
            i++;
            move();
        },3000);

        // 移动
        function move(){
            // 如果超出左边界
            if(i<0){
                _list1.css("left",-(size-1)*iWidth) // 瞬间移动到第5张图
                i = size -2;  //即将移动到第四张图（ i= 3 的图）
            }

            // 如果超出右边界
            if(i >= size ){
                _list1.css("left",0); // 瞬间移动到第一张图(非动画效果)
                i = 1;  // 即将移动到第2 张图 （i = 1 的图 ）
            }

            // 先停止之前的动画，然后在执行新的动画
            _list1.stop().animate({
                left : -i* iWidth  // 600 表示每一张图片的宽度
            },500)

            // 更改按钮的选中状态
            _li2.removeClass().eq(i).addClass("active");
            if(i == size -1){
                _li2.removeClass().eq(0).addClass("active");
            }
        }

        // 上一页
        $("#left").click(function(){
            i--;   // 这里减1 是因为move（）函数里面没有写i++,如果写了的话就应该减2
            move();
        })

        // 下一页
        $("#right").click(function(){
            i++;
            move();
        })

        // 按钮的移入事件
        _li2.mouseenter(function(){
            i = $(this).index();
            move();
        })

        $("#box").hover(function(){ // mouseenter 事件
                clearInterval(timer) ;  // 停止定时器
            },
            function(){ // mouseleave  事件
                timer = setInterval(function(){
                    i++;
                    move();
                },3000)
            })
    }

    // 导航栏保持在顶部
    var navNode = $("div.header_container div.nav_container");
    $(window).scroll(function(){
        var currentTop = $(this).scrollTop();// 这里this是指window
        //console.log($(this).scrollTop());
        if(currentTop>=120){
            //console.log("aa");
            navNode.css({
                "position" : "fixed",
                "top" : 0
            })
        }else{
            navNode.css({
                "position" : "absolute",
                "top" : 120
            })
        }
    })


    $(".back-to-top").click(function(){
        $("body,html").animate({
            "scrollTop" : 0
        },500)
    })


    //鼠标移入图片的放大和透明度效果

    $(".e_thumbnail_box").hover(function(){
        $(this).find("img").stop();
        $(this).find("img").animate({
            "width" : 340,
            "height" : 220,
            "margin" :-5
        },500)
        $(this).find(".e_mouseover").css({
            "opacity" : 0.5,
            "display" : "block"
        })
    },function(){
        $(this).find("img").stop();
        $(this).find("img").animate({
            "width" : 318,
            "height" : 191,
            "margin" : 0
        },500)
        $(this).find(".e_mouseover").css({
            "opacity" : 0,
            "display" : "block"
        })
    })


    //鼠标移入图片的放大和透明度效果并显示字体内容
    $(".theEventImg").hover(function(){
        $(this).find(".theMask").show();
        $(this).find(".text").show();
        $(this).find("img").stop();
        $(this).find("img").animate({
            "width" : 340,
            "height" : 220,
            "margin" :-5
        },500)
    },function(){
        $(this).find(".theMask").hide();
        $(this).find(".text").hide();
        $(this).find("img").stop();
        $(this).find("img").animate({
            "width" : 318,
            "height" : 191,
            "margin" :0
        },500)
    })


    //活动列表，加入鼠标事件
    //$(".div1").find("span").each(function (index,ele) {
    //    console.log(index);
    //    $("this").click(function(){
    //        $(".activitiesContent").eq(index).show();
    //        $(".theSlider").css({
    //            "left" : 90*index
    //        })
    //    })
    //})

    $(".div1").find("span").each(function (index,ele){
        $(".div1").find("span").eq(index).click(function(){
            //console.log(index);
            $(".theSlider").css({
                "left" : 90*index
            })
            $(".activitiesContent").hide();
            $(".activitiesContent").eq(index).show();
        })
    })

    $(".theActivities").hover(function () {
        $(this).find(".theMask").show();
        $(this).find(".theButton").show();
    }, function () {
        $(this).find(".theMask").hide();
        $(this).find(".theButton").hide();
    })


    //页面显示登录用户名
    if (location.search){
        var myname = location.search.split("?")[1];
        $("#ul_header .theLi").eq(0).find("a").html(myname);
        $("#ul_header .theLi").eq(2).find("a").html("退出");
        $("#men").attr("href","Men.html?"+myname)
    }




});