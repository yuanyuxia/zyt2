/**
 * Created by Administrator on 2017/5/15.
 */
//仿select标签
$('.select').each(function () {
    var obj = $(this);
    if (obj.find('.svalue').length == 0) {
        obj.append('<p class="svalue"></p><i></i>');
        //obj.find('li').eq(0).addClass("on cur");
        obj.find('.svalue').html(obj.find('li.cur').length > 0 ? obj.find('li.cur').html() : obj.find('li').eq(0).html());
    }
    obj.on("click", function (ev) {
        var _this = $(this);
        _this.toggleClass("active");
        var obj_other = $(".select").not(_this);//获取同页面其他下拉列表
        obj_other.removeClass("active");
        obj_other.children("ul").slideUp();//点击该下拉列表时隐藏其他下拉列表
        _this.children("ul").slideToggle();

        //阻止冒泡
        var ev = ev || window.event;
        if(ev.stopPropagation){
            ev.stopPropagation();
        }
        else if(window.event){
            window.event.cancelBubble = true;//兼容IE
        }

        //点击空白区域隐藏下拉列表
        $(document).on("click", function () {
            obj.removeClass("active");
            _this.children("ul").slideUp();
        });
    });

    obj.on('mouseover', 'li', function () {
        $(this).siblings().removeClass("on");
    });
    obj.on('click', 'li', function () {
        $(this).siblings().removeClass("cur");
        $(this).addClass("on cur");
        $(this).parent().siblings(".svalue").html($(this).html());
    });
});


var showPop = ({
	//url:json文件地址
	//btn:点击的对象
	//resObj:存储返回值的对象
	//link:每个值之间的链接符	
	
	//三级联动
	linkage1:function(url,btn,resObj,oneObj,twoObj,link1,link2){
		var link1 = link1 || "-";
		var link2 = link2 || "-";
		var userPicker = new mui.PopPicker({
			layer:3
		});
		$.getJSON(url,function(data){			
			userPicker.setData(data);
			var showUserPickerButton = document.getElementById(btn);
			var userResult = document.getElementById(resObj);
			var oneResult = document.getElementById(oneObj);
			var twoResult = document.getElementById(twoObj);
			showUserPickerButton.addEventListener('tap', function(event) {
				userPicker.show(function(items) {
					userResult.value = items[0].text+link1+items[1].text+link2+items[2].text;
					oneResult.value = items[2].areaCode;
					var str  = (userResult.value).replace(/-/g," "); 
					twoResult.value = str;
				});
			}, false);	
		
		});
		
	},
	
	//时间
	showDate:function(btn,resObj,timeObj){
		mui.init();
		
		var d = new Date();
		var curYear = d.getFullYear();
		var curMonth = (d.getMonth()+1)<10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1);
		var curDate = d.getDate() <10 ? "0"+d.getDate() : d.getDate();	
		var curValue = curYear + "-" + curMonth + "-" + curDate;
		
		var result = document.getElementById(resObj);
		var btn = document.getElementById(btn);
		var timeResult = document.getElementById(timeObj);
;		btn.addEventListener('tap', function() {
			var picker = new mui.DtPicker({
				"type": "date",
				"value":curValue,
				"beginYear":curYear-70,
				"engYear":curYear+70
			});
			picker.show(function(rs) {
				result.value = rs.text;
				//timeResult.value = result.value;
				picker.dispose();
			});
		}, false);
	},
	

});
