/**
 * Created by Administrator on 2016/10/8 0008.
 */
$(function(){
    //验证手机号码是11位数字或者验证邮箱输入格式是否正确
    $("#username").blur(function(){
        var tel = /^\d{11}$/;
        var Email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if($(this).val()==""){
            $("#Act_error").text("手机号码或邮箱不能为空")
        }else if(!tel.test($("#username").val()) && !Email.test($("#username").val() )){
            $("#Act_error").text("请输入正确的邮箱或手机号码")
        }else {
            $("#Act_error").text("")
        }
    })

    // 验证密码
    $("#passWordtext").blur(function(){
        if($(this).val() == ""){
            $("#Pwd_error").text("密码不能为空");
        }else if($(this).val().length < 6  || $(this).val().length >20 ){
            $("#Pwd_error").text("密码长度不符合规则");
        }else if( $(this).val().length>= 6 && $(this).val().length < 10 ){
            $("#Pwd_error").text("");
            $("#low").css("background","red")
        }else if($(this).val().length >=10 &&$(this).val().length <15){
            $("#Pwd_error").text("");
            $("#low").css("background","red");
            $("#middle").css("background","blue")
        }else{
            $("#low").css("background","red");
            $("#middle").css("background","blue");
            $("#height").css("background","green");
        }
    })

    //验证重复密码
    $("#RPwd").blur(function(){
        if($(this).val() != $("#passWordtext").val() ){
            $("#RPwd_error").html("两次密码输入不一致");
        }else {
            $("#RPwd_error").html("");
        }
    })

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
    $(".yanzheng").blur(function(){
        if($(this).val() == $("#randomNum").text() ){
            $("#Rdm_error").text("")
        }else {
            $("#Rdm_error").text("验证码输入错误")
        }
    })


    //点击注册按钮
    $("#regist").click(function(){
        //验证手机号码是11位数字或者验证邮箱输入格式是否正确

            var tel = /^\d{11}$/;
            var Email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if($("#username").val()==""){
                $("#Act_error").text("手机号码或邮箱不能为空")
                return;
            }else if(!tel.test($("#username").val()) && !Email.test($("#username").val() )){
                $("#Act_error").text("请输入正确的邮箱或手机号码")
                return;
            }else {
                $("#Act_error").text("")
            }

        // 验证密码
            if($("#passWordtext").val() == ""){
                $("#Pwd_error").text("密码不能为空");
                return;
            }else if($("#passWordtext").val().length < 6  || $("#passWordtext").val().length >20 ){
                $("#Pwd_error").text("密码长度不符合规则");
                return;
            }else {
                $("#Pwd_error").text("");
            }

        //验证重复密码
        //     if($("#RPwd").val() != $("#passWordtext").val() ){
        //         $("#RPwd_error").html("两次密码输入不一致");
        //         return;
        //     }else {
        //         $("#RPwd_error").html("");
        //     }
        //
        //
        // //验证码验证
        // if($(".yanzheng").val() == $("#randomNum").text() ){
        //     $("#Rdm_error").text("")
        // }else {
        //     $("#Rdm_error").text("验证码输入错误");
        //     return;
        // }
        //

        //验证是否已经注册过了
        // 先获取之前保存在cookie中的用户
        var users = $.cookie("users")?JSON.parse($.cookie("users")):[] ;

        // 遍历users数组， 判断是否存在该用户，如果存在则不能注册
        for(i=0;i<users.length;i++){
            if($("#username").val() == users[i].name){
                alert("该用户已经存在，不能注册");

                //清空里面的内容
                $("#username").val("");
                $("#passWordtext").val("");
                $("#RPwd").val("");
                $("#randomImg").val("");
                $("#randomNum").text("");

                return;  //不需要重新添加新用户，所以要return
            }
        }

        // 需要注册的用户（保存到cookie中的用户）
        var user = {
            name : $("#username").val(), // 用户名
            pwd : $("#passWordtext").val()  // 密码
        };

        users.push(user) ;   // 添加新用户

        //保存到cookie中
        $.cookie("users",JSON.stringify(users),{expires:30,path:"/"});
        console.log($.cookie("users"));


        alert("恭喜你 注册成功！");

        //清空里面的内容
        $("#username").val("");
        $("#passWordtext").val("");
        $("#RPwd").val("");
        $("#randomImg").val("");
        $("#randomNum").text("");

        location.href = 'mlh/login.html';

    })

});

