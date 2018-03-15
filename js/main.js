/**
 * Created by Administrator on 2017/5/15.
 */
$(function(){
    /*页脚切换*/
    $(".footer ul li").on("click",function(){
        $(this).addClass("on").siblings().removeClass("on");
    });    
	 
});

/*解决键盘从底部滑出时，把固定定位的按钮顶上来的问题*/
function changeHeight(obj){
	/*alert("1");*/
   	var h=$(window).height();
    $(window).resize(function() {
        if($(window).height()<h){
            $(obj).hide();
        }else{
            $(obj).show();
        }
    });

}