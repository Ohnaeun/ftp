$(document).ready(function(){
    var $liea=$("#banners>li").length;
    var $liwidth=$("#banners>li").eq(0).width();
    var $fullwidth=$liea*$liwidth;
    $("#banners").css("width",$fullwidth+"px");
    //디스크 초기값
    var $dno=0;
    
    var $timer;

    $.fn.bannerm=function(){
    $timer=setTimeout(function repeat(){
        $("#banners").animate({
            "left":(-$liwidth)+"px"
        },800,function(){
        var $copy=$("#banners>li").eq(0).clone();
        $("#banners>li").eq(0).remove();
        $(this).css("left","0px");
        $(this).append($copy);
        });

        $("#disc>li").css({"background-color":"white","width":"10px"});
        $dno++;
        if($dno>=$liea){
            $dno=0;
        }
        $("#disc>li").eq($dno).css({"background-color":"gray","width":"50px"});

        $timer=setTimeout(repeat,5000);
    },5000);
    }
    
    var $banner_list = [
        ["./banner/banner5.png","https://www.coffeebeankorea.com/","coffeebean"],
        ["./banner/banner6.png","https://www.starbucks.co.kr/index.do","starbucks"],
        ["./banner/banner7.png","https://www.tomntoms.com/main/main.html","tomntoms"],
        ["./banner/banner8.png","http://www.caffebene.co.kr/","caffebene"]
    ];
    
    var $banner_number=$banner_list.length;
    var $node=0;
    do{
        $("#banners>li").eq($node).attr("data",$banner_list[$node][1]);
        $("#banners>li:eq("+$node+")>img").attr("src",$banner_list[$node][0]);
        $("#banners>li:eq("+$node+")>img").attr("title",$banner_list[$node][2]);
        $("#disc").append("<li></li> ");
        $node++;
    }while($node<$banner_number)

    $("#banners").click(function(){
        var $link=$("#banners>li").eq(0).attr("data");
        location.href=$link;
    });
    
    $("#banner_box").bind({
        "mouseenter":function(){
            $(".spanbtn").stop().fadeIn();
            clearTimeout($timer);
        },

        "mouseleave":function(){
            $(".spanbtn").stop().fadeOut();
            $.fn.bannerm();
        }
    });

    $("#right").click(function(){
        $("#banners").animate({
            "left":(-$liwidth)+"px"
        },800,function(){
        var $copy=$("#banners>li").eq(0).clone();
        $("#banners>li").eq(0).remove();
        $(this).append($copy);
        $(this).css("left","0px");
        });

       //디스크 이동
        $("#disc>li").css({"background-color":"white","width":"10px"});
        $dno++;
        if($dno>=$liea){
            $dno=0;
        }
        $("#disc>li").eq($dno).css({"background-color":"gray","width":"50px"});
    });

    $("#left").click(function(){
        var $copy=$("#banners>li").eq($liea-1).clone();
        $("#banners>li").eq($liea-1).remove();
        $("#banners").prepend($copy);
        $("#banners").css("left",(-$liwidth)+"px");
        $("#banners").animate({
            "left":"0px"
        },800);

        //디스크 이동
        $("#disc>li").css({"background-color":"white","width":"10px"});
        if($dno==0){
            $dno=$liea-1;
        }
        else{
            $dno=$dno-1;
        }
        $("#disc>li").eq($dno).css({"background-color":"gray","width":"50px"});
    });

    $.fn.bannerm();

    $("#disc>li").click(function(){
        clearTimeout($timer);
        var $discnode=$(this).index();  //해당 디스크 노드값
        //해당 디스크 클릭 부분
        $("#disc>li").css({"background-color":"white","width":"10px"});
        $("#disc>li").eq($discnode).css({"background-color":"gray","width":"50px"});
        var $ck;
        var $nodem;
        for($ck=0;$ck<$liea;$ck++){
            $nodem=$("#banners>li").eq($ck).attr("node");

            if($discnode==$nodem){ 
                //해당 노드 위치 파악
                var $offset=String(Math.ceil($("#banners>li").eq($ck).offset().left));
                var $count=$offset.length;
                var $substr;
                var $left_offset;
                if($count==3){
                    $left_offset=0;
                }
                else{
                    var $clickno=$ck;
                    $substr=Number(Math.floor($offset/$liwidth));

                    $left_offset=$liwidth*$substr;
                    $("#banners").animate({
                        "left":-$left_offset+"px"
                    },800,function(){
                    
                        var $index_no=$("#banners>li").eq($clickno).index();
                        var $n;
                        for($n=0;$n<$index_no;$n++){
                            var $cp=$("#banners>li").eq(0).clone();
                            $("#banners>li").eq(0).remove();
                            $("#banners").append($cp);    
                        }
                        $("#banners").css("left","0px");
                        $dno=$discnode; //클릭 디스크 노드
                    });
                }
            } 
        }
    });
    $("#disc").mouseenter(function(){
        clearTimeout($timer);
    });
});