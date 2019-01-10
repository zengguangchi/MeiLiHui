/**
 * Created by Administrator on 2016/10/8 0008.
 */


$(function(){
    //验证码验证
    $("#randomNum").click(function(){
        $(this).css({
            "fontSize" : 25
        })
        var str= "";
        for(var i=0;i<4;i++){
            var a = parseInt(Math.random()*10);
            str += a;
        }
        $("#randomNum").text(str);
    })


    // 点击登录按钮
    $("#submitBtn").click(function(){
        if($("#username").val() == "" || $("#passWordtext").val() == ""){
            alert("用户名或密码不能为空");
            return;
        }

        //验证码验证
        if($(".yanzheng").val() == $("#randomNum").text() ){
            $("#Rdm_error").text("")
        }else {
            $("#Rdm_error").text("验证码输入错误");
            return;
        }

        //  获取cookie中注册过的所有用户
        var users = $.cookie("users");
        if(users){
            users = JSON.parse(users);

            // 遍历查找是否有匹配的用户
            var isExist = false;  //  表示是否存在该用户，默认不存在
            for(i=0;i<users.length;i++){
                if($("#username").val() == users[i].name && $("#passWordtext").val() == users[i].pwd){
                    //用户存在
                    alert("登录成功");

                    //清空里面的内容
                    //$("#username").val("");
                    $("#passWordtext").val("");
                    $("#randomImg").val("");
                    $("#randomNum").text("");
                    location.href = "Homepage.html?"+$("#username").val();

                    isExist = true;   // 表示存在该用户

                }
            }

            if(!isExist){
                alert("用户名或密码错误");

                //清空里面的内容
                //$("#username").val("");
                $("#passWordtext").val("");
                $("#randomImg").val("");
                $("#randomNum").text("");
            }
        }

        ////是否免登陆
        //if($("#checkbox").checked){
        //    var name = $("#username").val();
        //    var password = $("#passWordtext").val();
        //
        //    //设置失效日期
        //    var d = new Date();
        //    d.setDate(d.getDate()+10);
        //
        //    //设置cookie
        //    setCookie("name",name,d);
        //    setCookie("password",password,d);
        //}

    })

})