$(function(){
    var box = $('.box');
    var copy = $(".copy");
    var canvas = $("canvas");
    var cobj =canvas[0].getContext("2d");
    canvas.attr({
        width:copy.width(),
        height:copy.height()
    })
    $(".hasson").hover(function(){
        $(this).find(".son").finish();
        $(this).find(".son").fadeIn(200);
    },function(){
        $(this).find(".son").fadeOut(200);
    })
    var obj=new shape(copy[0],canvas[0],cobj,$(".xp"),$(".selectarea"));
    $(".file li").click(function(){
        var index=$(this).index(".file li");
        if(index==0){
            if(obj.history.length>0){
                var yes=window.confirm("是否要保存");
                if(yes){
                    location.href=(canvas[0].toDataURL().replace("data:img/png","stream/octet"))
                }
            }
            obj.history=[];
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
        }else if(index==1){
            location.href=(canvas[0].toDataURL().replace("data:img"))
        }else if(index==2){
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
            if(obj.history.length==0){
                alert("不能后退");
                return
            }
            var data=obj.history.pop();
            cobj.putImageData(data,0,0);
        }
    })
    $(".xpsize li").click(function(){
        var w=$(this).attr("data-role");
        var h=$(this).attr("data-role");
       obj.xp($(".xp"),w,h)
    })
    $(".bgcolor").find(".se").click(function(){
        obj.bgcolor=$(this).attr("data");
    })
    $(".borderColor input").change(function(){
        obj.borderColor=$(this).val();
    })
    $(".hasson:eq(3)").find(".son li").click(function(){
        obj.lineWidth=$(this).attr("xiantiao");
        })
    $(".hasson:eq(2)").find(".son li").click(function(){
    obj.type=$(this).attr("data-rol");
    })
    $(".hasson:eq(1)").find(".son li").click(function(){
        if($(this).attr("data-role")!="pen"){
            obj.shapes = $(this).attr("data-role");
            obj.draw();
        }else{
            obj.pen();
        }
    })
    $(".select").click(function(){
            obj.select($(".selectarea"))
    })


})