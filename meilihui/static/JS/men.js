/**
 * Created by Administrator on 2016/10/9 0009.
 */



$(function(){
    var shangpin = location.search.replace("?","");
    $.get("JSON/men.json",function(data){
        for(var i=0;i<data.length;i++){
            var obj = data[i];
            var id = obj.id;
            var mai = obj.mai;
            var img = obj.img;
            var alt = obj.alt;
            var title = obj.title;
            var p1 = obj.p1;
            var p2 = obj.p2;
            var span1 = obj.span1;
            var span2 = obj.span2;

           /* var listproductNode = $("<div class='listproduct'></div>");
            var productImgNode = $("<div class='product_img'></div>");
            var productLabelNode = $("<div class='product_label'></div>");
            var maiNode = $("<p class='label01 ie6png_compatible'>"+ mai+"</p>");
            var aNode1 = $("<a href='' target='_blank' style='white-space: normal'></a>");
            var ImgNode = $("<img src="+img+" alt="+alt +" title="+title +">");

            productImgNode.append(aNode1).append(ImgNode);
            productImgNode.append(productLabelNode).append(maiNode);

            var productContentNode = $("<div class='product_content'></div>");
            var pNode1 = $("<p style='display: block;width: 225px;overflow: hidden;-o-text-overflow: ellipsis;white-space: nowrap;text-overflow: ellipsis'></p>");
            var aNode2 = $("<a href='' style='color: #000'>"+p1+"</a>");
            pNode1.append(aNode2);

            var pNode2 = $("<p style='display: block;width: 225px;overflow: hidden;-o-text-overflow: ellipsis;white-space: nowrap;text-overflow: ellipsis'></p>")
            var aNode3 = $("<a href='' style='color: #000'>"+p2+"</a>");
            pNode2.append(aNode3);

            var pNode3 = $("<p class='font14px'></p>");
            var spanNode1 = $("<span class='red'>"+span1 +"</span>")
            var spanNode2 = $("<span style='text-decoration: line-through;font-size: 12px;margin-left:20px'>"+span2 +"</span>");
            pNode3.append(spanNode1);
            pNode3.append(spanNode2);

            productContentNode.append(pNode1);
            productContentNode.append(pNode2);
            productContentNode.append(pNode3);

            listproductNode.append(productImgNode);
            listproductNode.append(productContentNode);

            //$("#contentDiv").append(listproductNode);*/

            $("#contentDiv").append('<div class="listproduct">' +
                '<div class="product_img">' +
                '<div class="product_label">' +
                '<p class="label01 ie6png_compatible">'+mai+'</p>' +
                '</div>' +
                '<a href=GoodsDetails.html?'+id+'&'+shangpin+' target="_blank" style="white-space: normal">' +
                '<img src='+img+' alt='+alt+' title='+title+'>' +
                '</a>' +
                '</div>' +
                '<div class="product_content">' +
                '<p style="display: block;width: 225px;overflow: hidden;-o-text-overflow: ellipsis;white-space: nowrap;text-overflow: ellipsis">' +
                '<a href="" style="color: #000">' +
                p1 +
                '</a>' +
                '</p>' +
                '<p style="display: block;width: 225px;overflow: hidden;-o-text-overflow: ellipsis;white-space: nowrap;text-overflow: ellipsis">' +
                '<a href="" style="color: #000">' +
                p2 +
                '</a>' +
                '</p>' +
                '<p class="font14px">' +
                '<span class="red">'+span1+'</span>' +
                '<span style="text-decoration: line-through;font-size: 12px;margin-left:20px">'+span2+'</span>' +
                '</p>' +
                '</div>'+
                '</div>');
        }

        $(".listproduct").hover(function(){
            $(this).css({
                //"border": "1px solid red"
                "border-color" : "red"
            })
        },function(){
            $(this).css({
                "border-color" : "white"
            })
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
                $("#spanTimer").html("0"+day + "天" + hour + "时" + min + "分钟"+ sec + "秒");
            }else {
                $("#spanTimer").html(day + "天" + hour + "时" + min + "分钟" + sec + "秒");
            }

            if(hour<=9){
                $("#spanTimer").html(day + "天" +"0"+ hour + "时" + min + "分钟" + sec + "秒");
            }else {
                $("#spanTimer").html(day + "天" + hour + "时" + min + "分钟" + sec + "秒");
            }

            if (min<=9){
                $("#spanTimer").html(day + "天" + hour + "时" +"0"+ min + "分钟" + sec + "秒");
            }else {
                $("#spanTimer").html(day + "天" + hour + "时" + min + "分钟" + sec + "秒");
            }

            if(sec<=9){
                $("#spanTimer").html(day + "天" + hour + "时" + min + "分钟" +"0"+ sec + "秒");
            }else {
                $("#spanTimer").html(day + "天" + hour + "时" + min + "分钟" + sec + "秒");
            }

        },1000)
    })
})
