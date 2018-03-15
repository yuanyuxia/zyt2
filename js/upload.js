var showImg = ({
	showImage: function(thisObj, imgObj, inputObj, spanObj) {
	imgObj.css({
		"position": "absolute",
		"top": "0px",
		"left": "0px",
	});
	var imgSrc = $(thisObj)[0].value;
	if((navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") || (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i) == "9.")) {
		if(!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(imgSrc)) {
			imgSrc = "";
			return false;
		} else {
			//IE下，使用滤镜
			inputObj.select();
			inputObj.blur();
			var imgSrc1 = document.selection.createRange().text;
			//必须设置初始大小
			spanObj.style.display = "inline-block";
			//图片异常的捕捉，防止用户修改后缀来伪造图片
			try {
				spanObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
				spanObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc1;
				imgObj.attr("src", "");
				imgObj.css("display", "none");
				spanObj.css("background-image", "none");
			} catch(e) {
				alert("您上传的图片格式不正确，请重新选择!");
				return false;
			}
			document.selection.empty();
		}
	} else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/10./i) == "10.") {
		if(!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(imgSrc)) {
			imgSrc = "";
			return false;
		} else {
			var file = $(thisObj)[0].files[0];
			var url = URL.createObjectURL(file);
			imgObj.attr("src", url);
			spanObj.css("background-image", "none");
		}
	} else {
		if(!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(imgSrc)) {
			imgSrc = "";
			return false;
		} else {
			var file = $(thisObj)[0].files[0];
			var url = URL.createObjectURL(file);
			imgObj.attr("src", url);
			spanObj.css("background-image", "none");
			// spanObj.style.backgroundImage="none";
		}
	}
}
})
